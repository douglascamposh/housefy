import React from "react";
import { FormInput } from "./FormInput";
import { ErrorMessage } from "formik";
import { Label } from "./Label";
import { colors } from "@/app/constants/colors";
const FormInputLabel = (props) => {
  return(
        <div>
            <Label htmlFor="name">{props.label}</Label>
            <FormInput
            {...props}

            className={`${props.errors?.name && props.touched?.name ? style.errorBorder :style.border}`}
            />
            <ErrorMessage name={props.name} component="div" className={style.errorBorder+" "+style.color} />
        </div>

  );
}
const style = {
    errorBorder: colors.borderErrorRed,
    color:colors.textErrorRed,
    border: 'border-gray-300'
};
export {FormInputLabel};
