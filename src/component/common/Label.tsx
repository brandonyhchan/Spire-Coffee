import React from "react";
import styles from "../pages/cafe/cafe.module.scss";
import classNames from "classnames";

type LabelPropsType = {
  icon?: JSX.Element;
  text?: string | JSX.Element;
  secondaryText?: string;
};

const Label = ({ icon, text, secondaryText }: LabelPropsType) => {
  return (
    <div className={classNames(styles.labelContainer)}>
      {icon}
      <label>{text !== null ? text : secondaryText}</label>
    </div>
  );
};

export default Label;
