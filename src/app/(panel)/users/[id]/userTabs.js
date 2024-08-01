"use client";

import Tabs from "@/app/_lib/hyeui/components/tabs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaListCheck, FaUser } from "react-icons/fa6";

export default function UserTabs({ user }) {
  let tabs = [
    {
      name: "Information",
      href: `/users/${user.id}`,
      icon: FaUser,
    },
    {
      name: "Permissions",
      href: `/users/${user.id}/permissions`,
      icon: FaListCheck,
    },
  ];
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(
    tabs.findIndex((tab) => tab.href == pathname)
  );
  useEffect(() => {
    setActiveTab(tabs.findIndex((tab) => tab.href == pathname));
  }, [pathname]);
  return <Tabs activeTab={activeTab} className="mt-2" tabs={tabs} />;
}
