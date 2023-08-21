import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, name, placeholder, value, onChange, onBlur, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`border rounded py-2 px-3 ${className}`}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func, 
  className: PropTypes.string,
};

export default Input;
