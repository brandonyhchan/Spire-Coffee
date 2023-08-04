import React, { ReactNode } from "react";
import Input from "./Input";
import classNames from "classnames";
import styles from "./Form.module.scss";

type FormItemPropsType = {
  type: string;
  text?: string;
  name: string;
  value?: string;
  placeholder?: string | undefined;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateLoginInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: ReactNode;
  secondErrorMessage?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
  radio?: boolean;
};

const FormItem = ({
  type,
  text,
  name,
  value,
  placeholder,
  handleChange,
  validateLoginInput,
  errorMessage,
  secondErrorMessage,
  maxLength,
  disabled,
  radio,
}: FormItemPropsType) => {
  return !radio ? (
    <div className={classNames(styles.formContainer)}>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={validateLoginInput}
        maxLength={maxLength}
        disabled={disabled}
      />
      <label>{text}</label>
      {errorMessage}
      {secondErrorMessage}
    </div>
  ) : (
    <div className={classNames(styles.radioButton)}>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={validateLoginInput}
        maxLength={maxLength}
        disabled={disabled}
      />
      <label>{text}</label>
    </div>
  );
};

export default FormItem;
