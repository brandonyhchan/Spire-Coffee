import React from "react";

type InputPropsType = {
  type: string;
  placeholder: string | undefined;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
};

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  maxLength,
  disabled,
}: InputPropsType) => {
  return (
    <input
      type={type}
      placeholder={placeholder || undefined}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
      required
      disabled={disabled}
    />
  );
};

export default Input;
