import React from "react";
import "./button.scss";

const Button = ({ children }) => {
  return <button className="buttonMade">{children}</button>;
};

export default Button;
