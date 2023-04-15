import React, { ChangeEvent } from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";
import { SelectOptions } from "component/pages/explore/FilterSideBar";

type RadioFilterPropsType = {
  options: string[];
  type: string;
  text: string;
  filterSelection: SelectOptions | undefined;
  checked: string;
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RadioFilter = ({
  options,
  type,
  text,
  checked,
  handleFilter,
}: RadioFilterPropsType) => {
  return (
    <FilterComponent text={text}>
      {options.map((option) => (
        <FilterOption
          key={option}
          className={classNames(styles.listWrapper)}
          text={option}
          type={type}
          value={option}
          checked={checked === option}
          onChange={handleFilter}
        />
      ))}
    </FilterComponent>
  );
};

export default RadioFilter;
