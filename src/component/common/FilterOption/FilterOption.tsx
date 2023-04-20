import React, { ChangeEvent } from "react";
import classNames from "classnames";
import styles from "./FilterOption.module.scss";

type FilterOptionPropsType = {
  text: string;
  type: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
  name?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  icon?: JSX.Element;
};

const FilterOption = ({
  text,
  type,
  onChange,
  checked,
  value,
  name,
  onClick,
  onFocus,
  icon,
}: FilterOptionPropsType) => {
  return (
    <div className={classNames(styles.listContainer)}>
      <div className={classNames(styles.listWrapper)}>
        <input
          type={type}
          checked={checked}
          onChange={onChange}
          value={value}
          name={name}
          onClick={onClick}
          onFocus={onFocus}
        />
        <label>{text}</label>
      </div>
      <label>{icon}</label>
    </div>
  );
};

export default FilterOption;
