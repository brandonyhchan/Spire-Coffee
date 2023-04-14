import React, { useState, ChangeEvent } from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";
import { SelectOptions } from "./SelectOptions";

type RadioFilterPropsType = {
  options: string[];
  type: string;
  text: string;
  checked: string;
  setFilterSelection: (option: SelectOptions) => void;
  setChecked: (option: string) => void;
};

const RadioFilter = ({
  options,
  type,
  text,
  checked,
  setFilterSelection,
  setChecked,
}: RadioFilterPropsType) => {
  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (option === "Not too busy") {
      setFilterSelection(SelectOptions.LOW);
    } else if (option === "A little busy") {
      setFilterSelection(SelectOptions.MEDIUM);
    } else {
      setFilterSelection(SelectOptions.HIGH);
    }
    setChecked(option);
  };

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
