import { generators } from "openid-client";
import oidcClient from "../oidc";

export async function GET() {
  let client = oidcClient;
  const codeVerifier = generators.codeVerifier();
  let url = client.authorizationUrl({
    scope: "openid profile email",
    code_challenge: generators.codeChallenge(codeVerifier),
    code_challenge_method: "S256",
  });
  return new Response("You are being redirected...", {
    status: 301,
    headers: {
      "Set-Cookie": `code_verifier=${codeVerifier}; HttpOnly;`,
      Location: url,
    },
  });
}
