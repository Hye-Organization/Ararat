"use client";

import { Button } from "@/app/_lib/hyeui";
import { Input } from "@/app/_lib/hyeui/components/input";
import { Listbox, ListboxOption } from "@/app/_lib/hyeui/components/listbox";
import Modal from "@/app/_lib/hyeui/components/modal";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function CreateInstance() {
  const [creatingNode, setCreatingNode] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const [nodeName, setNodeName] = useState("");
  const [nodeDomain, setNodeDomain] = useState("");
  const [selectedOS, setSelectedOS] = useState("ubuntu/22.04");
  const [selectedPlan, setSelectedPlan] = useState("t1.micro");

  const router = useRouter();

  const handleDeploy = async () => {
    setDeploying(true);

    try {
      const response = await fetch('/api/createInstance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nodeName,
          description: nodeDomain,
          source: {
            type: "image",
            alias: selectedOS,
            protocol: "simplestreams",
            server: "https://images.linuxcontainers.org",
            source: "foo/snap0"
          },
          instance_type: selectedPlan,
          start: true
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setCreatingNode(false);
        router.push('/');
      } else {
        console.error('Error creating instance:', result);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <>
      <Modal
        size="xl"
        title="Create Instance"
        mute
        open={creatingNode}
        onClose={() => setCreatingNode(false)}
      >
        <p className="text-sm text-gray-300">
          Enter your instance information:
        </p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Input
            value={nodeName}
            onChange={(e) => setNodeName(e.currentTarget.value)}
            placeholder="Server Name"
          />
          <Input
            value={nodeDomain}
            onChange={(e) => setNodeDomain(e.currentTarget.value)}
            placeholder="Server Description"
          />
          <Listbox
            name="Operating System"
            value={selectedOS}
            onChange={(e) => setSelectedOS(e)}
          >
            <ListboxOption value="ubuntu/22.04">Ubuntu 22.04</ListboxOption>
          </Listbox>
          <Listbox
            name="Server Plan"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e)}
          >
            <ListboxOption value="t1.micro">t1.micro</ListboxOption>
          </Listbox>
        </div>
        <Button
          onClick={handleDeploy}
          disabled={deploying || !nodeName || !nodeDomain}
        >
          {deploying ? 'Deploying' : 'Deploy'}
        </Button>
      </Modal>
      <Button
        className="ml-auto"
        onClick={() => setCreatingNode(true)}
      >
        Create Instance
      </Button>
    </>
  );
}
