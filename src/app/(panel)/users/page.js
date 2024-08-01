import { Button } from "@/app/_lib/hyeui";
import ImportUser from "./importUser";
import Table from "@/app/_lib/hyeui/components/table";
import prisma from "@/app/_lib/prisma";
import Link from "next/link";
import { getCurrentUser } from "@/app/_lib/users";

export default async function Users() {
  let requestingUser = await getCurrentUser();
  let validRoles = ["viewer", "operator", "manager"];
  if (
    !validRoles.includes(requestingUser.adminRole) &&
    !validRoles.includes(requestingUser.usersRole)
  ) {
    return <p>You do not have permission to view this page</p>;
  }
  let canImport = false;
  if (
    requestingUser.adminRole == "manager" ||
    requestingUser.usersRole == "operator"
  ) {
    canImport = true;
  }
  let users = await prisma.user.findMany();
  let tableBody = [];
  for (let user of users) {
    tableBody.push([
      user.firstName + " " + user.lastName,
      user.email,
      user.id,
      <Link href={`/users/${user.id}`}>
        <Button size="xs">Manage</Button>
      </Link>,
    ]);
  }
  return (
    <>
      <div className="flex mb-2">
        <p className="text-3xl font-bold">Users</p>
        {canImport ? <ImportUser /> : null}
      </div>
      <Table head={["Name", "Email", "ID", "Manage"]} body={tableBody} />
    </>
  );
}
