import { connectOIDC } from "incus";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import Image from "next/image";
import prisma from "../_lib/prisma";
import incusClient from "../_lib/incus";
import { Button, Paper } from "@/app/_lib/hyeui";
import { Input } from "@/app/_lib/hyeui/components/input";
import { Label } from "@headlessui/react";
import { Field } from "@/app/_lib/hyeui/components/fieldset";
import Table from "@/app/_lib/hyeui/components/table";
import Link from "next/link";

export default async function Home() {
  const cookieJar = cookies();
  let incus = incusClient("https://95.216.211.49:8443");
  let dat = await incus.get("");
  console.log(dat.data);
  const user = decode(cookieJar.get("id_token").value);
  console.log(user);
  const nodes = await prisma.node.findMany({});

  const instances = await incus.get("/instances?recursion=1");

  let instanceTable = [];
  for (let instance of instances.data.metadata) {
    instanceTable.push([
      instance.name,
      <div className="flex items-center text-center space-x-2">
        <span class="relative flex h-3 w-3">
          <span className={instance.status == "Running" ? "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" : "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"}></span>
          <span className={instance.status == "Running" ? "relative inline-flex rounded-full h-3 w-3 bg-green-500" : "relative inline-flex rounded-full h-3 w-3 bg-red-500"}></span>
        </span>
        <span className={instance.status == "Running" ? "text-green-500" : "text-red-500"}>{instance.status}</span>
      </div>,
      instance.location,
      instance.description,
      instance.created_at,
      <Link href={`/instance/manager/${instance.name}`}>
        <Button size="xs">Manage</Button>
      </Link>,
    ]);
  }

  return (
    <><div className="flex mb-2">
      <p className="text-3xl font-bold">Instances</p>
      <Button className="ml-auto">Create Instance</Button>
    </div>
      <Table head={["Name", "Status", "Location", "Description", "Created At", "Manage"]} body={instanceTable} />
    </>
  );
}
