import React from "react";

const Sidebar = ({ itemList, selectedItem, onItemSelected, contentMap }) => {
  return (
    <div className="sm:flex sm:flex-row flex-col h-screen w-full ">
      <aside className="sm:w-64   p-4 overflow-auto ">
        <ul className="sm:space-y-1 flex sm:flex-col">
          {itemList.map((item, index) => (
            <li
              key={index}
              className={`text-black flex items-center rounded-full px-3 py-2 hover:text-primary cursor-pointer hover:border hover:border-primary ${
                selectedItem === item.label
                  ? "font-bold bg-primary text-white hover:text-white"
                  : ""
              }`}
              onClick={() => onItemSelected(item.label)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4 shadow-xl">{contentMap[selectedItem]}</main>
    </div>
  );
};

export default Sidebar;
