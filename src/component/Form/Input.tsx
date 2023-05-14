import React from "react";

type InputPropsType = {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  maxLength,
}: InputPropsType) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
      required
    />
  );
};

export default Input;
