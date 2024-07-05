import { connectOIDC } from "incus";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import Image from "next/image";
import prisma from "../_lib/prisma";
import incusClient from "../_lib/incus";
import { Button } from "../_lib/hyeui";

export default async function Home() {
  const cookieJar = cookies();
  let incus = incusClient("https://172.30.156.254:8443");
  let dat = await incus.get("");
  console.log(dat.data);
  const user = decode(cookieJar.get("id_token").value);
  console.log(user);
  const nodes = await prisma.node.findMany({});
  return (
    <div className="flex">
      <p className="text-3xl font-bold">Instances</p>
      <Button className="ml-auto">Create Instance</Button>
    </div>
  );
}
