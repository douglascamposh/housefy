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
  inputStyle:"py-3  p-r-4 bg-gray-300 w-full outline-none rounded-lg border focus:border focus:border-blue-300",
    errorBorder: "border-red-500",
    border: 'border-gray-300'
};
export {FormInput};
