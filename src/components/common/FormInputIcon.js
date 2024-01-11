
import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { FormInput } from "./FormInput";
import { ErrorMessage } from "formik";
import { Colors, Border } from "@/app/constants/Styles";

const FormInputIcon = (props) => {
  const { icon: Icon, type, name, placeholder, ...rest } = props;
  const {
    inputContainerStyle,
    iconStyle,
    inputStyle,
    inputErrorStyle,
    eyeIconStyle,
    errorLabelStyle,
  } = styles;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className={`${inputContainerStyle}`}>
        <Icon className={`${iconStyle}`} />
        <FormInput
          type={type === "password" && showPassword ? "text" : type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`${props.errors[name] && props.touched[name] ? inputErrorStyle : inputStyle}`}

          {...rest}
        />

        {type === "password" ? (
          showPassword ? (
            <RiEyeOffLine
              onClick={() => setShowPassword(!showPassword)}
              className={`${eyeIconStyle}`}
            />
          ) : (
            <RiEyeLine
              onClick={() => setShowPassword(!showPassword)}
              className={`${eyeIconStyle}`}
            />
          )
        ) : null}
      </div>
      <ErrorMessage 
        name={props.name} 
        component="div" 
        className={errorLabelStyle} 
      />
    </div>
  );
};

const styles = {
  inputContainerStyle: `
    relative
  `,
  iconStyle: `
    absolute 
    top-1/2 
    -translate-y-1/2 
    left-2
  `,
  inputStyle: `
    ${Border.input}
    pl-8
  `,
  inputErrorStyle: `
    ${Border.inputError}
    pl-8
  `,
  eyeIconStyle: `
    ${Colors.primaryText}
    absolute 
    top-1/2 
    -translate-y-1/2 
    right-2 
    hover:cursor-pointer
  `,
  errorLabelStyle: `
    ${Colors.primaryRed}
    text-sm
  `,
};

export default FormInputIcon;
