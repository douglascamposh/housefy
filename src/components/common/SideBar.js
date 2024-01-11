import React from "react";
import { Colors } from "@/app/constants/Styles";

const Sidebar = ({ itemList, selectedItem, onItemSelected, contentMap }) => {
  const { 
    containerStyle, 
    asideStyle, 
    containerListStyle, 
    listStyle, 
    selectedItemStyle, 
    contentMapStyle 
  } = styles;

  return (
    <div className={`${containerStyle}`}>
      <aside className={`${asideStyle}`}>
        <ul className={`${containerListStyle}`}>
          {itemList.map((item, index) => (
            <li
              key={index}
              className={`${listStyle} ${selectedItem === item.label ? selectedItemStyle : ""}`}
              onClick={() => onItemSelected(item.label)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>
      <main className={`${contentMapStyle}`}>{contentMap[selectedItem]}</main>
    </div>
  );
};

const styles = {
  containerStyle: `
    sm:flex 
    sm:flex-row 
    flex-col 
    h-screen 
    w-full
  `,
  asideStyle: `
    sm:w-64 
    p-4 
    overflow-auto
  `,
  containerListStyle: `
    sm:space-y-1 
    flex 
    sm:flex-col
  `,
  listStyle: `
    ${Colors.secondaryText} 
    flex 
    items-center 
    rounded-full 
    px-3 
    py-2 
    hover:${Colors.primaryText} 
    cursor-pointer 
    hover:border 
    hover:border-primary
  `,
  selectedItemStyle: `
    font-bold 
    bg-primary 
    text-white 
    hover:text-white
  `,
  contentMapStyle: `
    flex-1 
    p-4 
    shadow-xl
  `,
};

export default Sidebar;
