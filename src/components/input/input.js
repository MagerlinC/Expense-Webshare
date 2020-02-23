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
  focusOnMount,
  onEnter
}) => {
  let input;
  const onChangeHandler = changeEvent => {
    onChange(changeEvent.target.value);
  };

  const onKeyDownHandler = keyEvent => {
    if (keyEvent.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  useEffect(() => {
    if (focusOnMount && input) {
      input.focus();
    }
  }, [focusOnMount, input]);

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
        onKeyDown={onKeyDownHandler}
        className={"input"}
      />
    </div>
  );
};

export default Input;
