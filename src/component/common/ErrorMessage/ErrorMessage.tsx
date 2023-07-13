import React from "react";
import classNames from "classnames";
import styles from "./ErrorMessage.module.scss";

type ErrorMessagePropsType = {
  text?: string;
};

const ErrorMessage = ({ text }: ErrorMessagePropsType) => {
  return <span className={classNames(styles.errorMessage)}>{text}</span>;
};

export default ErrorMessage;
