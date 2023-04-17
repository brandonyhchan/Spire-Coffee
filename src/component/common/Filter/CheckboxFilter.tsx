import React from "react";
import { SelectOptions } from "./RadioFilter";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

type CheckboxFilterPropsType = {
  options: SelectOptions[];
  type: string;
  text: string;
  filterSelection: string[];
  handleFilter: (option: SelectOptions) => void;
  label: string[];
};

const CheckboxFilter = ({
  options,
  type,
  text,
  handleFilter,
  label,
}: CheckboxFilterPropsType) => {
  const list = [
    { label: label[0], option: options[0] },
    { label: label[1], option: options[1] },
    { label: label[2], option: options[2] },
  ];
  return (
    <FilterComponent text={text}>
      {list.map((item, index) => (
        <FilterOption
          key={index}
          className={classNames(styles.listWrapper)}
          text={item.label}
          type={type}
          value={item.option}
          onChange={() => handleFilter(item.option)}
        />
      ))}
    </FilterComponent>
  );
};

export default CheckboxFilter;
