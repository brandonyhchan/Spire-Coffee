import React, { ChangeEvent } from "react";
import FilterComponent from "component/common/Filter/FilterComponent/FilterComponent";
import FilterOption from "component/common/Filter/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/Filter/FilterComponent/FilterComponent.module.scss";

export enum SelectOptions {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

type RadioFilterPropsType = {
  options: string[];
  type: string;
  text: string;
  filterSelection: SelectOptions | undefined; // add type for sort filter here
  checked: string;
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  renderIcon: (option: string) => JSX.Element | undefined;
  mobileFiltersOpen: boolean;
};

const RadioFilter = ({
  options,
  type,
  text,
  checked,
  handleFilter,
  renderIcon,
  mobileFiltersOpen,
}: RadioFilterPropsType) => {
  return (
    <FilterComponent text={text} mobileFiltersOpen={mobileFiltersOpen}>
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
