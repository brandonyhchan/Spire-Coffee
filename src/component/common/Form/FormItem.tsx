import React, { ReactNode } from "react";
import Input from "./Input";
import classNames from "classnames";

type FormItemPropsType = {
  className?: string;
  type: string;
  text?: string;
  name: string;
  value?: string;
  placeholder: string | undefined;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateLoginInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: ReactNode;
  secondErrorMessage?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
};

const FormItem = ({
  className,
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
}: FormItemPropsType) => {
  return (
    <div className={classNames(className)}>
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
  );
};

export default FormItem;
