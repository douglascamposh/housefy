import React from "react";
import { FormInput } from "./FormInput";
import { ErrorMessage } from "formik";
import { Label } from "./Label";
import { colors } from "@/app/constants/colors";
const FormInputLabel = (props) => {
  // label="Nombre"
  //                   name="name"
  //                   type="text"
  //                   autoComplete="name"
  //                   placeholder="Nombre"
  //                   touched={touched}
  //                   errors={errors}
  //                   value={values.name}
  console.log(props.errors, "errors");
  console.log(props.touched, "touched");
  
  const {name} = props
  return(
        <div>
            <Label htmlFor="name">{props.label}</Label>
            <FormInput
            {...props}

            className={`${props.errors?.[name] && props.touched?.[name] ? style.errorBorder :style.border} pl-4`}
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
