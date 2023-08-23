
import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { FormInput } from "./FormInput";
import { ErrorMessage } from "formik";
import { colors } from "@/app/constants/colors";
const FormInputIcon = (props) => {
  const { icon: Icon, type, name, placeholder, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">

    <div className="relative ">
      <Icon className="absolute top-1/2 -translate-y-1/2 left-2" />
      <FormInput
        type={type === "password" && showPassword ? "text" : type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`${props.errors[name] && props.touched[name] ? style.errorBorder :style.border} pl-8`}
        
        {...rest}
        >
        
      </FormInput>


      {type === "password" ? (
        showPassword ? (
          <RiEyeOffLine
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
          />
        ) : (
          <RiEyeLine
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
          />
        )
      ) : null}
    </div>
      <ErrorMessage name={props.name} component="div" className={style.errorBorder+" "+style.color+" "+style.fontStyle} />
      </div>

  );
};
const style = {
    errorBorder: colors.borderErrorRed,
    color:colors.textErrorRed,
    border: 'border-gray-300',
    fontStyle:'text-sm '
};
export default FormInputIcon;
