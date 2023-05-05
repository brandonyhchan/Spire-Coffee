import React, { ChangeEvent } from "react";
import FilterComponent from "component/common/Filter/FilterComponent/FilterComponent";
import FilterOption from "component/common/Filter/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/Filter/FilterComponent/FilterComponent.module.scss";
import { checkDEV } from "@apollo/client/utilities/globals";
import { mergeOptions } from "@apollo/client";

export enum SelectOptions {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

type RadioFilterPropsType = {
  options: SelectOptions[];
  type: string;
  text: string;
  filterSelection: SelectOptions | undefined;
  checked: string;
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  renderIcon: (option: string) => JSX.Element | undefined;
  mobileFiltersOpen: boolean;
  label: string[];
};

const RadioFilter = ({
  options,
  type,
  text,
  checked,
  handleFilter,
  renderIcon,
  mobileFiltersOpen,
  label,
}: RadioFilterPropsType) => {
  const list = [
    { label: label[0], option: options[0] },
    { label: label[1], option: options[1] },
    { label: label[2], option: options[2] },
  ];
  return (
    <FilterComponent text={text} mobileFiltersOpen={mobileFiltersOpen}>
      {list.map((item, index) => (
        <FilterOption
          key={index}
          className={classNames(styles.listWrapper)}
          text={item.label}
          type={type}
          value={item.option}
          checked={checked === item.option}
          onChange={handleFilter}
          icon={renderIcon(item.option)}
        />
      ))}
    </FilterComponent>
  );
};

export default RadioFilter;
