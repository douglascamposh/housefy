import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const NoDataMessage = ({
  message = "No hay datos disponibles en este momento.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mt-[-100px]">
      <FaExclamationCircle className="text-4xl text-red-500 mb-4" />
      <p className="text-2xl text-gray-600 mb-4 text-center">{message}</p>
    </div>
  );
};

NoDataMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoDataMessage;
