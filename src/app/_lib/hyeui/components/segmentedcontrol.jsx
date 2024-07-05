"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";

export default function SegmentedControl({
  options,
  defaultTab,
  className,
  onChange,
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || 0);
  if (onChange) {
    onChange(activeTab);
  }
  return (
    <TabGroup
      onChange={(e) => {
        setActiveTab(e);
      }}
      className={className + " w-fit"}
    >
      <TabList className="bg-slate-825 w-fit rounded-xl p-1">
        {options.map((option, index) => {
          return (
            <Tab
              key={index}
              className={`p-2 transition-all rounded-xl outline-none ${
                activeTab == index
                  ? "bg-slate-750 shadow-lg"
                  : "bg-slate-800/0 shadow-none"
              }`}
            >
              {typeof option === "object" ? option : 
              <p className="font-normal">{option}</p>
              }
            </Tab>
          );
        })}
      </TabList>
    </TabGroup>
  );
}
