import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, className, ...restProps }) => {
  return (
    <button
      className={`bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded mt-2 ${className}`}
      onClick={onClick}
      {...restProps}
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

export default Button;
