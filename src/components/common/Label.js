import React from "react";
import { Colors } from "@/app/constants/Styles";

const Label = (props) => {
  return (
    <label {...props} className={`${props.class} ${styles.labelStyle}`}>
      {props.children}
    </label>
  );
}

const styles = {
  labelStyle: `
    ${Colors.primaryGray}
    block 
    bold-medium 
    text-sm 
  `,
};

export {Label};
