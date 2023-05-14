import React, { ReactNode } from "react";
import Input from "./Input";
import classNames from "classnames";

type FormItemPropsType = {
  className?: string;
  type: string;
  text: string;
  name: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateLoginInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  renderErrorMessage?: ReactNode;
  renderSecondErrorMessage?: ReactNode;
  maxLength?: number;
};

const FormItem = ({
  className,
  type,
  text,
  name,
  value,
  handleChange,
  validateLoginInput,
  renderErrorMessage,
  renderSecondErrorMessage,
  maxLength,
}: FormItemPropsType) => {
  return (
    <div className={classNames(className)}>
      <Input
        type={type}
        placeholder={text}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={validateLoginInput}
        maxLength={maxLength}
      />
      <label>{text}</label>
      {renderErrorMessage}
      {renderSecondErrorMessage}
    </div>
  );
};

export default FormItem;
