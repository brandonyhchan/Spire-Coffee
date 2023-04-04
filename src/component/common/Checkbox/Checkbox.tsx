import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

type CheckboxPropsType = {
  text: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  name?: string;
};

const Checkbox = ({
  text,
  onChange,
  checked,
  value,
  onClick,
  name,
}: CheckboxPropsType) => {
  return (
    <div className={classNames(styles.listWrapper)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
        onClick={onClick}
        name={name}
      />
      <label>{text}</label>
    </div>
  );
};

export default Checkbox;
