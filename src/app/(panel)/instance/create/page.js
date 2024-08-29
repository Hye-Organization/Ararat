import incusClient from "@/app/_lib/incus";
import { Button, Paper } from "@/app/_lib/hyeui";
import { Input } from "@/app/_lib/hyeui/components/input";
import { Label } from "@headlessui/react";
import { Field } from "@/app/_lib/hyeui/components/fieldset";
import Table from "@/app/_lib/hyeui/components/table";
import Link from "next/link";
import CreateInstance from "@/app/(panel)/instance/create/createInstance";

export default async function Home() {
  let incus = incusClient("https://95.216.211.49:8443");

  return (
    <><div className="flex mb-2">
      <p className="text-3xl font-bold">Instances</p>
      <CreateInstance />
    </div>
    </>
  );
}