import React from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";
const Checkbox = ({ label, checked, onChange }) => {
  const { containerStyle, inputContainerStyle, inputStyle, iconStyle, labelStyle } = styles;

  return (
    <div className={`${containerStyle}`}>
      <div className={`${containerStyle} ${inputContainerStyle}`}>
        <input
          type="checkbox"
          onChange={onChange}
          className={`${inputStyle}`}
        />
        <div className={`${iconStyle}`}>
          {checked && <FaCheck></FaCheck>}
        </div>
      </div>
      {label && <label className={`${labelStyle}`}>{label}</label>}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const styles = {
  containerStyle: `
    flex
    items-center
  `,
  inputContainerStyle: `
    mr-4 
    mb-2 
    p-2
  `,
  inputStyle: `
    opacity-0 
    absolute 
    h-6 
    w-6
  `,
  iconStyle: `
    shadow-lg 
    bg-white 
    border-[1px] 
    rounded-sm 
    border-gray-500 
    w-6 h-6 
    flex 
    flex-shrink-0 
    justify-center 
    items-center  
    mr-2
  `,
  labelStyle: `
    ml-2 
    text-gray-700
  `
};

export default Checkbox;
