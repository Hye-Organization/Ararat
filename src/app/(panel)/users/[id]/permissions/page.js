import { Button, Paper } from "@/app/_lib/hyeui";
import { Field, Label } from "@/app/_lib/hyeui/components/fieldset";
import { Input } from "@/app/_lib/hyeui/components/input";
import { Listbox, ListboxOption } from "@/app/_lib/hyeui/components/listbox";
import { FaQuestionCircle } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import PermissionsGuide from "./permissionsGuide";
import prisma from "@/app/_lib/prisma";
import PermissionsSelector from "./permissionsSelector";
import { getCurrentUser } from "@/app/_lib/users";

export default async function Permissions({ params }) {
  let viewOnly;
  let requestingUser = await getCurrentUser();
  if (requestingUser.usersRole == "viewer") {
    viewOnly = true;
  }
  if (requestingUser.adminRole == "operator") {
    viewOnly = false;
  } else if (requestingUser.adminRole == "viewer") {
    viewOnly = true;
  }
  if (viewOnly) {
    if (
      requestingUser.usersRole == "manager" ||
      requestingUser.usersRole == "operator"
    ) {
      viewOnly = false;
    }
  }
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <Paper>
      <div className="flex mb-2">
        <p className="text-xl font-bold">Global Permissions</p>
        <PermissionsGuide />
      </div>
      <PermissionsSelector viewOnly={viewOnly} user={user} />
    </Paper>
  );
}
