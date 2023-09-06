import React from "react";
import { FormInput } from "./FormInput";
import { ErrorMessage } from "formik";
import { Label } from "./Label";
import { colors } from "@/app/constants/colors";
const FormInputLabel = (props) => {

  const {name} = props
  return(
        <div>
            <Label htmlFor="name">{props.label}</Label>
            <FormInput
            {...props}

            className={`${(props.errors?.[name] && props.touched?.[name]) || (props.errors?.address?.[name.split(".")[1]] && props.touched?.address?.[name.split(".")[1]]) ? style.errorBorder :style.border} pl-4`}
            />
            <ErrorMessage name={props.name} component="div" className={style.errorBorder+" "+style.color} />
        </div>

  );
}
const style = {
    errorBorder: colors.borderErrorRed, //border-red-500
    color:colors.textErrorRed,
    border: 'border-gray-300'
};
export {FormInputLabel};
