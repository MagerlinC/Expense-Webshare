import React from "react";
import "./button.scss";

const Button = ({ onClick, text, onFocus, onBlur, title }) => {
  return (
    <div className={"button-wrapper"}>
      <button
        title={title}
        tabIndex="0"
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
