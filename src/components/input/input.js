import React, { useEffect } from "react";
import "./input.scss";

const Input = ({
  onChange,
  value,
  isCurrency,
  onFocus,
  onBlur,
  placeholder,
  textAlign,
  focusOnMount
}) => {
  let input;
  const onChangeHandler = changeEvent => {
    onChange(changeEvent.target.value);
  };
  useEffect(() => {
    if (focusOnMount && input) {
      input.focus();
    }
  }, []);

  return (
    <div className={"input-wrapper" + (isCurrency ? " currency" : "")}>
      <input
        ref={inputElem => (input = inputElem)}
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
