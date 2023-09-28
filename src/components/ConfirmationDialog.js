import React from "react";

const ConfirmationDialog = ({ isOpen, onCancel, onConfirm, content }) => {
  return (
    <div>
      <div
        className={`fixed inset-0 z-40 ${
          isOpen ? "bg-black opacity-50" : "hidden"
        } transition-opacity duration-300`}
      ></div>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300`}
      >
        <div className="bg-white mx-5 w-full sm:w-96 p-6 rounded-lg shadow-lg ">
          <p className="text-lg sm:text-xl font-semibold mb-4">{content}</p>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-red-100 text-red-600 rounded border border-red-300 hover:bg-red-200 focus:outline-none"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-green-100 text-green-600 rounded border border-green-300 ml-2 hover:bg-green-200 focus:outline-none"
              onClick={onConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
