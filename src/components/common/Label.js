import React from "react"

const Label = (props) => {
  return (
    <label {...props} className={[props.class, style.inputStyle].join(' ')}>
      {props.children}
    </label>
  );
}

const style = {
  inputStyle: "block bold-medium text-sm text-gray-700"
}

export {Label};
