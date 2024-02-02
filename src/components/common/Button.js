import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, className, ...restProps }) => {
  return (
    <button
      className={`bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded mt-2 ${className}`}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
