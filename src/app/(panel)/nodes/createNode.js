"use client";

import { Button } from "@/app/_lib/hyeui";
import { Input } from "@/app/_lib/hyeui/components/input";
import Modal from "@/app/_lib/hyeui/components/modal";
import { useEffect, useState } from "react";

export default function CreateNode({ URI }) {
  const [creatingNode, setCreatingNode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [installMethod, setInstallMethod] = useState(null);
  const [music, setMusic] = useState(new Audio("/sounds/createNode.mp3"));

  const [nodeName, setNodeName] = useState(null);
  const [nodeDomain, setNodeDomain] = useState(null);
  const [nodePort, setNodePort] = useState(null);

  useEffect(() => {
    if (creatingNode) {
      music.play();
      music.loop = true;
    }
  }, [creatingNode]);
  return (
    <>
      <Modal
        size="xl"
        title="Create Node"
        mute
        open={creatingNode}
        onClose={() => {
          setCreatingNode(false);
          music.pause();
          music.currentTime = 0;
        }}
      >
        {currentStep == 0 ? (
          <>
            <p className="text-sm text-gray-300">
              Use this tool to create a new node. A node is a server that runs
              all of the resources Ararat creates such as instances, storage
              pools, and reverse proxies. Make sure your node meets the
              following prerequisites:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="text-sm text-gray-300">
                Running Ubuntu 24.04 LTS
              </li>
              <li className="text-sm text-gray-300">
                Port 8443, 80, and 3000 are open
              </li>
              <li className="text-sm text-gray-300">
                You have a domain/subdomain pointing to the node IP
              </li>
              <li className="text-sm text-gray-300">Logged in as root</li>
            </ul>
            <div className="flex gap-2 mt-4">
              <Button
                color="red"
                className="ml-auto"
                onClick={() => {
                  setCreatingNode(false);
                  music.pause();
                  music.currentTime = 0;
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => setCurrentStep(1)}>Continue</Button>
            </div>
          </>
        ) : null}
        {currentStep == 1 ? (
          <>
            <p className="text-sm text-gray-300">
              Run the following command on your node to get started with Hye
              Lava Fast-Install:
            </p>
            <pre
              className="bg-slate-800 p-2 rounded-lg cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  `curl -sSl ${URI}/nodes/install | bash`
                );
                alert("Copied to clipboard!");
              }}
            >
              curl -sSl {URI}/nodes/install | bash
            </pre>
            <div className="flex mt-4 gap-2">
              <Button
                color="dark"
                className="ml-auto"
                onClick={() => {
                  setInstallMethod("manual");
                  setCurrentStep(2);
                }}
              >
                Manual Install
              </Button>
              <Button>Fast-Install</Button>
            </div>
          </>
        ) : null}
        {installMethod == "manual" ? (
          <>
            <p className="text-sm text-gray-300">
              Enter your Hye Lava connection information:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input
                value={nodeName}
                onChange={(e) => setNodeName(e.currentTarget.value)}
                placeholder="Node Name"
              />
              <Input
                value={nodeDomain}
                onChange={(e) => setNodeDomain(e.currentTarget.value)}
                placeholder="Node Domain"
              />
              <Input
                value={nodePort}
                onChange={(e) => setNodePort(e.currentTarget.value)}
                placeholder="Hye Lava Port"
              />
              <p className="text-sm text-gray-300">
                {nodeName} string: https://{nodeDomain}:{nodePort}
              </p>
            </div>
          </>
        ) : null}
      </Modal>
      <Button
        className="ml-auto"
        onClick={() => {
          setCreatingNode(true);
        }}
      >
        Create Node
      </Button>
    </>
  );
}
