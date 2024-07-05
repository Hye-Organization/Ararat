import { NextResponse } from "next/server";
import oidcClient from "../oidc";
import { serialize } from "cookie";
import { decode } from "jsonwebtoken";
import prisma from "@/app/_lib/prisma";

export async function GET(request) {
  console.log(request.headers);
  let codeVerifier;
  try {
    codeVerifier = request.headers
      .get("cookie")
      .split("code_verifier=")[1]
      .split(";")[0];
  } catch (error) {
    return Response.redirect(process.env.URI + "/auth/login");
  }

  const formBody = new URLSearchParams();
  formBody.append("grant_type", "authorization_code");
  let code = new URL(request.url).searchParams.get("code");
  formBody.append("code", code);
  formBody.append("redirect_uri", process.env.URI + "/auth/callback");
  formBody.append("client_id", process.env.OIDC_CLIENT_ID);
  formBody.append("scope", "openid profile email");
  formBody.append("code_verifier", codeVerifier);
  let response = await fetch(oidcClient.issuer.metadata.token_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
    cache: "no-cache",
  });
  let data = await response.json();
  if (data.error) {
    return Response.redirect(process.env.URI + "/auth/login");
  }
  let id_token_cookie = serialize("id_token", data.id_token, {
    path: "/",
    maxAge: data.expires_in,
  });
  let access_token_cookie = serialize("access_token", data.access_token, {
    path: "/",
    maxAge: data.expires_in,
  });
  let userData = decode(data.id_token);
  console.log(userData);
  const dbuser = await prisma.user.findUnique({
    where: {
      id: userData.sub,
    },
  });
  console.log("Found DB User", dbuser);
  if (!dbuser) {
    await prisma.user.create({
      data: {
        id: userData.sub,
        email: userData.email,
        firstName: userData.given_name,
        lastName: userData.family_name,
      },
    });
  }
  return new Response("You are being redirected...", {
    status: 301,
    headers: {
      "Set-Cookie": [id_token_cookie, access_token_cookie],
      Location: "/",
    },
  });
}
