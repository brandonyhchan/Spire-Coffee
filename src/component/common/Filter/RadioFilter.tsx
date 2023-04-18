import React, { ChangeEvent } from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

export enum SelectOptions {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

type RadioFilterPropsType = {
  options: string[];
  type: string;
  text: string;
  filterSelection: SelectOptions | undefined;
  checked: string;
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  renderIcon: (option: string) => JSX.Element;
};

const RadioFilter = ({
  options,
  type,
  text,
  checked,
  handleFilter,
  renderIcon,
}: RadioFilterPropsType) => {
  return (
    <FilterComponent text={text}>
      {options.map((option, index) => (
        <FilterOption
          key={index}
          className={classNames(styles.listWrapper)}
          text={option}
          type={type}
          value={option}
          checked={checked === option}
          onChange={handleFilter}
          icon={renderIcon(option)}
        />
      ))}
    </FilterComponent>
  );
};

export default RadioFilter;
