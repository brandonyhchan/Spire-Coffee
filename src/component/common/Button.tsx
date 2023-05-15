import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

type ButtonPropsType = {
  onClick?: MouseEventHandler;
  text?: string;
  type?: "primary" | "primaryOpposite" | "secondary" | "navbar" | "filter";
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
  <button
    className={
      disabled
        ? classNames(styles.disabled, styles.button, styles[type])
        : classNames(styles.button, styles[type])
    }
    type={buttonType}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    {text}
  </button>
);

export default Button;
