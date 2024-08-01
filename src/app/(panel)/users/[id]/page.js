import { Button, Paper } from "@/app/_lib/hyeui";
import DeleteUser from "./deleteUser";
import prisma from "@/app/_lib/prisma";
import { Input } from "@/app/_lib/hyeui/components/input";
import { Label } from "@headlessui/react";
import { Field } from "@/app/_lib/hyeui/components/fieldset";
import { getCurrentUser } from "@/app/_lib/users";

export default async function User({ params }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <>
      <Paper>
        <p className="text-xl mb-2 font-bold">User Information</p>
        <div className="grid grid-cols-2 gap-2">
          <Field>
            <Label>
              <p className="text-sm">First Name</p>
            </Label>
            <Input label="First Name" disabled value={user.firstName} />
          </Field>
          <Field>
            <Label>
              <p className="text-sm">Last Name</p>
            </Label>
            <Input label="First Name" disabled value={user.lastName} />
          </Field>{" "}
          <Field>
            <Label>
              <p className="text-sm">Email</p>
            </Label>
            <Input label="First Name" disabled value={user.email} />
          </Field>{" "}
        </div>
      </Paper>
      <div className="flex mt-2">
        <div className="ml-auto">
          <DeleteUser user={user} />
        </div>
      </div>
    </>
  );
}
