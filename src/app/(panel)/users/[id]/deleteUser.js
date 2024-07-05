"use client";

import { Button } from "@/app/_lib/hyeui";
import Modal from "@/app/_lib/hyeui/components/modal";
import { playErrorSound, playLoadingSound } from "@/app/_lib/sounds";
import { deleteUser } from "@/app/_lib/users";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteUser({ user }) {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  return (
    <>
      <Modal
        title="Delete User"
        open={confirm}
        onClose={() => setConfirm(false)}
      >
        <p className="text-sm text-gray-300">
          {error ? (
            <p className="text-red-500">
              An error occured while attempting to import the user:{" "}
              {JSON.stringify(error)}
            </p>
          ) : (
            `Are you sure you want to delete the user ${user.firstName} ${user.lastName} with the email address ${user.email}? This action cannot be undone. The user will lose access to all resources and data.`
          )}
        </p>
        <div className="flex gap-x-2 mt-4">
          <Button
            className="mt-auto ml-auto"
            onClick={() => {
              let closeSound = new Audio("/sounds/closePopup.wav");
              closeSound.play();
              setConfirm(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="mt-auto"
            color="red"
            loading={deleting}
            onClick={async () => {
              setDeleting(true);
              let stopLoadingSound = playLoadingSound();
              let dat = await deleteUser(user.id);
              stopLoadingSound();
              setDeleting(false);
              if (dat.error) {
                playErrorSound();
                return setError(dat.error);
              }
              router.push("/users");
            }}
          >
            Delete User
          </Button>
        </div>
      </Modal>
      <Button onClick={() => setConfirm(true)} color="red">
        Delete User
      </Button>
    </>
  );
}
