import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

type ListPropsType = {
  text: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
};

const List = ({ text, onChange, checked, value, onClick }: ListPropsType) => {
  return (
    <div className={classNames(styles.listWrapper)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
        onClick={onClick}
      />
      <label>{text}</label>
    </div>
  );
};

export default List;
