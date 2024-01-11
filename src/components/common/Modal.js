import React from "react";
import { FaTimes } from "react-icons/fa";
import { Colors } from "@/app/constants/Styles";

const Modal = ({ isOpen, onClose, children, title, className  }) => {
  const {
    containerStyle, 
    modalStyle, 
    contentStyle, 
    titleStyle, 
    buttonStyle, 
    iconStyle, 
    childrenStyle
  } = styles;
  
  if (!isOpen) {
    return null;
  }

  return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={`${containerStyle}`}>
      <div className={`${modalStyle} ${className}`}>
        <div className={`${contentStyle}`}>
          <h3 className={`${titleStyle}`}>{title}</h3>
          <button type="button" className={`${buttonStyle}`} onClick={onClose}>
            <FaTimes className={`${iconStyle}`} />{" "}
          </button>
        </div>
        <div className={`${childrenStyle}`}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  containerStyle: `
    ${Colors.backgroundSecoundary}
    fixed 
    top-0 
    left-0 
    right-0 
    z-50 
    flex 
    sm:items-center 
    items-end 
    justify-center 
    h-full 
    bg-opacity-75
  `,
  modalStyle: `
    ${Colors.backgroundPrimary}
    relative 
    w-full  
    sm:w-110 
    sm:max-w-2xl 
    md:w-120 
    lg:w-160 
    xl:w-192 
    rounded-lg 
    shadow-lg 
    mx-auto
  `,
  contentStyle: `
    flex 
    items-start 
    justify-between 
    p-4 
    border-b 
    rounded-t
  `,
  titleStyle: `
    ${Colors.secoundaryGray}
    text-xl 
    font-semibold 
  `,
  buttonStyle: `
    ${Colors.tertiaryGray}
    hover:${Colors.backgroundtertiary} 
    hover:${Colors.secoundaryGray} 
    bg-transparent 
    rounded-lg 
    text-sm 
    w-8 
    h-8 
    ml-auto 
    inline-flex 
    justify-center 
    items-center
  `,
  iconStyle: `
    w-4 
    h-4
  `,
  childrenStyle: `
    p-6 
    space-y-6
  `,
};

export default Modal;
