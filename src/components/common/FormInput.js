import React from "react";
import { Field } from 'formik';

const FormInput = (props) => {
  return(
      <Field
        { ...props}
        className={[props.className, style.inputStyle].join(' ')}
        value={props.value}
      />
  );
}
const style = {
    inputStyle: "appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm",
    errorBorder: "border-red-500",
    border: 'border-gray-300'
};
export {FormInput};
