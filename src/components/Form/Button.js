import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick,className }) => {
  return (
    <button
      className={`${ButtonStyles.button} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
const ButtonStyles = {
  button: "bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded",
};




export default Button;
