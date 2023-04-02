import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import styles from "./List.module.scss";

type ListPropsType = {
  text: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
};

const List = ({ text, onChange, checked, value }: ListPropsType) => {
  return (
    <div className={classNames(styles.listWrapper)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label>{text}</label>
    </div>
  );
};

export default List;
