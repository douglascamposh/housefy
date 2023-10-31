import React from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center ">
      <div className="p-2">
        <div className="flex items-center mr-4 mb-2">
          <input
            type="checkbox"
            onChange={onChange}
            className="opacity-0 absolute h-6 w-6"
          />
          <div className="shadow-lg bg-white border-[1px] rounded-sm border-gray-500 w-6 h-6 flex flex-shrink-0 justify-center items-center  mr-2 ">
            {checked && <FaCheck></FaCheck>}
          </div>
        </div>
      </div>
      {label && <label className="ml-2 text-gray-700">{label}</label>}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
