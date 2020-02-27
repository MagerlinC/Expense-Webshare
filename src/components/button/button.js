import React from "react";
import "./button.scss";

const Button = ({ onClick, text, onFocus, onBlur }) => {
  return (
    <div className={"button-wrapper"}>
      <button
        onKeyDown={e => (e.key === "Enter" ? onClick() : void 0)}
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
