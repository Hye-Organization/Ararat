import { Button, Paper } from "@/app/_lib/hyeui";
import prisma from "@/app/_lib/prisma";
import { Input } from "@/app/_lib/hyeui/components/input";
import { Label } from "@headlessui/react";
import { Field } from "@/app/_lib/hyeui/components/fieldset";
import { getCurrentUser } from "@/app/_lib/users";

import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function Profile() {
  const cookieJar = cookies();
  const getUser = decode(cookieJar.get("id_token").value);
  console.log(getUser);
  const user = await prisma.user.findUnique({
    where: {
      email: getUser.email,
    },
  });

  return (
    <>
      <Paper>
        <p className="text-xl mb-2 font-bold">Profile</p>
        <div className="grid grid-cols-2 gap-2">
          <Field>
            <Label>
              <p className="text-sm">First Name</p>
            </Label>
            <Input label="First Name" value={user.firstName} />
          </Field>
          <Field>
            <Label>
              <p className="text-sm">Last Name</p>
            </Label>
            <Input label="First Name" value={user.lastName} />
          </Field>{" "}
          <Field>
            <Label>
              <p className="text-sm">Email</p>
            </Label>
            <Input label="First Name" value={user.email} />
          </Field>{" "}
        </div>
      </Paper>
    </>
  );
}