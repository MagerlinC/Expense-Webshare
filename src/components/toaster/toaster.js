import React from "react";
import "./toaster.scss";

const Toaster = ({ shown, text }) => {
  if (!shown) {
    return <div className={"empty-toaster"}></div>;
  }
  return <div className={"toaster-wrapper animated fadeInUp"}>{text}</div>;
};

export default Toaster;
