import React from "react";
import "./button.scss";

const Button = ({ onClick, text, onFocus, onBlur }) => {
  return (
    <div className={"button-wrapper"}>
      <button
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        className={"button"}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
