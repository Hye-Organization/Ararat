"use client";

import { Button } from "@/app/_lib/hyeui";
import { Field, Label } from "@/app/_lib/hyeui/components/fieldset";
import { Listbox, ListboxOption } from "@/app/_lib/hyeui/components/listbox";
import Modal from "@/app/_lib/hyeui/components/modal";
import { playErrorSound, playLoadingSound } from "@/app/_lib/sounds";
import { updateUser } from "@/app/_lib/users";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PermissionsSelector({ user, viewOnly }) {
  const [administrativeRole, setAdministrativeRole] = useState(
    user.adminRole ?? ""
  );
  const [usersRole, setUsersRole] = useState(user.usersRole ?? "");
  const [settingPerms, setSettingPerms] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  return (
    <>
      <Modal
        mute
        open={error}
        onClose={() => {
          setError(null);
          router.refresh();
        }}
        title="Error"
      >
        <p className="text-sm text-red-500">{error}</p>
      </Modal>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <Label>
            <p className="text-sm">Ararat Administrative Role</p>
          </Label>
          <Listbox
            disabled={viewOnly}
            name="Ararat"
            value={administrativeRole}
            onChange={(e) => {
              setAdministrativeRole(e);
            }}
          >
            <ListboxOption value="manager">Manager</ListboxOption>
            <ListboxOption value="operator">Operator</ListboxOption>
            <ListboxOption value="viewer">Viewer</ListboxOption>
            <ListboxOption value="">None</ListboxOption>
          </Listbox>
        </Field>
        <Field>
          <Label>
            <p className="text-sm">Users Role</p>
          </Label>
          <Listbox
            disabled={viewOnly}
            name="Ararat"
            value={usersRole}
            onChange={(e) => {
              setUsersRole(e);
            }}
          >
            <ListboxOption value="manager">Manager</ListboxOption>
            <ListboxOption value="operator">Operator</ListboxOption>
            <ListboxOption value="viewer">Viewer</ListboxOption>
            <ListboxOption value="">None</ListboxOption>
          </Listbox>
        </Field>
      </div>
      {!viewOnly ? (
        <div className="flex mt-4">
          <Button
            loading={settingPerms}
            color="blue"
            className="ml-auto"
            onClick={async () => {
              setSettingPerms(true);
              let stopLoadingSound = playLoadingSound();
              let response = await updateUser(user.id, {
                adminRole: administrativeRole == "" ? null : administrativeRole,
                usersRole: usersRole == "" ? null : usersRole,
              });
              if (response.error) {
                setSettingPerms(false);
                stopLoadingSound();
                setError(response.error);
                playErrorSound();
              }
              stopLoadingSound();
              setSettingPerms(false);
            }}
          >
            Save Changes
          </Button>
        </div>
      ) : null}
    </>
  );
}
