import React from "react";
import { FormInput } from "./FormInput";
import { ErrorMessage } from "formik";
import { Label } from "./Label";
import { Colors, Border } from "@/app/constants/Styles";

const FormInputLabel = (props) => {
  const { name } = props
  const { inputStyle, inputErrorStyle } = styles;

  return (
    <div>
      <Label htmlFor="name">{props.label}</Label>
      <FormInput
        {...props}
        className={`
          ${(props.errors?.[name] 
            && props.touched?.[name]) || (props.errors?.address?.[name.split(".")[1]] 
            && props.touched?.address?.[name.split(".")[1]]) 
            ? inputErrorStyle : inputStyle}`}
      />
      <ErrorMessage name={props.name} component="div" className={Colors.primaryRed} />
    </div>
  );
}

const styles = {
  inputStyle: `
    ${Border.input}
    pl-4
  `,
  inputErrorStyle: `
    ${Border.inputError}
    pl-4
  `,
};

export { FormInputLabel };
