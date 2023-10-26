import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 flex sm:items-center items-end justify-center h-full bg-gray-900 bg-opacity-75"
    >
      <div className="relative w-full h-[80vh] sm:w-110 sm:max-w-2xl md:w-120 lg:w-160 xl:w-192 bg-white rounded-lg shadow-lg mx-auto">
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            <FaTimes className="w-4 h-4" />{" "}
          </button>
        </div>
        <div className="p-6 space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
