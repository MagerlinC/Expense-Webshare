import React from "react";
import "./checkbox.scss";

const Checkbox = ({ onChange, checked, focusable }) => {
  return (
    <div
      onKeyDown={e => (e.key === "Enter" ? onChange() : void 0)}
      onClick={onChange}
      tabIndex={focusable === false ? "" : "0"}
      className={"checkbox-wrapper" + (checked ? " checked" : "")}
    />
  );
};

export default Checkbox;
