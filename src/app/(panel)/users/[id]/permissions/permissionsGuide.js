"use client";

import { Divider } from "@/app/_lib/hyeui";
import Modal from "@/app/_lib/hyeui/components/modal";
import { useState } from "react";
import { FaQuestion } from "react-icons/fa6";

export default function PermissionsGuide() {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <>
      <Modal
        title="Global Permissions Guide"
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
      >
        <p className="text-sm text-gray-300">
          Global permissions are permissions that apply to the Ararat web
          component panel. Any resources created within nodes are not affected
          by these permissions.
        </p>
        <Divider className="my-2" />
        <p className="font-semibold">Manager</p>
        <p className="text-sm text-gray-300">
          Full access, including the ability to edit the configuration of the
          resource, and create new other resources within the resource if
          possible.
        </p>
        <p className="font-semibold mt-2">Operator</p>
        <p className="text-sm text-gray-300">
          Full access. Cannot edit the configuration of the resource or create
          new resources.
        </p>
        <p className="font-semibold mt-2">Viewer</p>
        <p className="text-sm text-gray-300">
          Read only access to the resource.
        </p>
        <p className="font-semibold mt-2">None</p>
        <p className="text-sm text-gray-300">No access to the resource</p>
      </Modal>
      <div
        onClick={() => setGuideOpen(true)}
        className="ml-auto bg-white/5 p-2 rounded-lg active:scale-90 cursor-pointer transition-all"
      >
        <FaQuestion />
      </div>
    </>
  );
}
