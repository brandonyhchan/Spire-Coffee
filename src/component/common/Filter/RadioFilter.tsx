import React, { useState, ChangeEvent } from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

enum SelectOptions {
  LOW,
  MEDIUM,
  HIGH,
}

type RadioFilterPropsType = {
  options: string[];
  type: string;
  text: string;
  filterSelection: SelectOptions | undefined;
  updateFilterSelection: (arg: SelectOptions) => void;
};

const RadioFilter = ({
  options,
  type,
  text,
  updateFilterSelection,
}: RadioFilterPropsType) => {
  const [filterSelection, setFilterSelection] = useState<SelectOptions>();
  const [checked, setChecked] = useState("");

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (option === "Not too busy") {
      setFilterSelection(SelectOptions.LOW);
      updateFilterSelection(SelectOptions.LOW);
    } else if (option === "A little busy") {
      setFilterSelection(SelectOptions.MEDIUM);
      updateFilterSelection(SelectOptions.MEDIUM);
    } else {
      setFilterSelection(SelectOptions.HIGH);
      updateFilterSelection(SelectOptions.HIGH);
    }
    setChecked(option);
    console.log("value: " + event.target.value);
    console.log("state: " + filterSelection);
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
