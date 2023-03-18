import React, { ChangeEvent } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

type InputPropsType = {
  type: string;
  value?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

const Input = ({
  type,
  name,
  value,
  placeholder,
  required,
  onChange,
  onBlur,
  maxLength,
  ...rest
}: InputPropsType) => (
  <input
    type="text"
    name={name}
    value={value}
    placeholder={placeholder}
    required
    onChange={onChange}
    onBlur={onBlur}
    maxLength={maxLength}
  />
);

export default Input;
