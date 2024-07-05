"use client";

import { Button } from "@/app/_lib/hyeui";
import { Dialog } from "@/app/_lib/hyeui/components/dialog";
import { Input } from "@/app/_lib/hyeui/components/input";
import Modal from "@/app/_lib/hyeui/components/modal";
import { playErrorSound, playLoadingSound } from "@/app/_lib/sounds";
import { importUser } from "@/app/_lib/users";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ImportUser() {
  const [importingUser, setImportingUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const router = useRouter();
  return (
    <>
      <Modal
        title="Import User"
        open={importingUser}
        onClose={() => setImportingUser(false)}
      >
        <p className="text-sm text-gray-300">
          {error ? (
            <p className="text-red-500">
              An error occured while attempting to import the user:{" "}
              {JSON.stringify(error)}
            </p>
          ) : (
            "Use this tool to add user data for a user who has not logged into Hye Ararat. This allows you to grant the user access to resources prior to their first login."
          )}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            placeholder="User ID"
            value={id}
            onChange={(e) => setId(e.currentTarget.value)}
          />
        </div>
        <div className="flex mt-4">
          <Button
            type="submit"
            className="ml-auto"
            loading={loading}
            onClick={async () => {
              setLoading(true);
              let stopLoadingSound = playLoadingSound();

              let dat = await importUser(firstName, lastName, email, id);

              stopLoadingSound();
              setLoading(false);
              if (dat.error) {
                setError(dat.error);
                return playErrorSound();
              }
              router.refresh();
              setImportingUser(false);
            }}
          >
            Import User
          </Button>
        </div>
      </Modal>
      <Button className="ml-auto" onClick={() => setImportingUser(true)}>
        Import User
      </Button>
    </>
  );
}
