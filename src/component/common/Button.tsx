import React, { MouseEventHandler } from "react";
import classNames from "classnames";

type ButtonPropsType = {
  onClick?: MouseEventHandler;
  text?: string;
  type?: "primary" | "secondary";
  buttonType?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  to?: string;
};

const Button = ({
  onClick,
  text,
  type = "primary",
  buttonType = "button",
  className,
  disabled = false,
  ...rest
}: ButtonPropsType) => (
  <button type={buttonType} onClick={onClick} disabled={disabled} {...rest}>
    {text}
  </button>
);

export default Button;
