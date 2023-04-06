import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import styles from "./FilterOption.module.scss";

type InputPropsType = {
  text: string;
  type: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  name?: string;
};

const Input = ({
  text,
  type,
  onChange,
  checked,
  value,
  onClick,
  name,
}: InputPropsType) => {
  return (
    <div className={classNames(styles.listWrapper)}>
      <input
        type={type}
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

export default Input;
