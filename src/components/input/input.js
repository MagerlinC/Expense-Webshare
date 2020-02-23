import React from "react";
import "./input.scss";

const Input = ({
  onChange,
  value,
  isCurrency,
  onFocus,
  onBlur,
  placeholder,
  textAlign
}) => {
  const onChangeHandler = changeEvent => {
    onChange(changeEvent.target.value);
  };

  return (
    <div className={"input-wrapper" + (isCurrency ? " currency" : "")}>
      <input
        style={{ textAlign: textAlign }}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChangeHandler}
        className={"input"}
      />
    </div>
  );
};

export default Input;
