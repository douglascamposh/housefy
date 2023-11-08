"use client";
import React from "react";
import { useState } from "react";
import Sidebar from "@/components/common/SideBar";
import { MdSettings } from "react-icons/md";
import {
  ConfigurationItems,
  contentConfiguration,
} from "@/app/constants/constants";
const Page = () => {
  const [selectedItem, setSelectedItem] = useState(ConfigurationItems[0].label);
  return (
    <div className="">
      <div className="mt-[50px] text-2xl flex items-center font-semibold mb-4 ml-4">
        Configuración
        <MdSettings className="ml-4"></MdSettings>
      </div>
      <Sidebar
        itemList={ConfigurationItems}
        selectedItem={selectedItem}
        onItemSelected={(itemLabel) => setSelectedItem(itemLabel)}
        contentMap={contentConfiguration}
      />
    </div>
  );
};

export default Page;
