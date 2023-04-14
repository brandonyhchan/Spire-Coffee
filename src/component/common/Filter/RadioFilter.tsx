import React, { useState, ChangeEvent } from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";
import Button from "component/common/Button";

enum SelectOptions {
  LOW,
  MEDIUM,
  HIGH,
}

type RadioFilterPropsType = {
  options: string[];
  type: string;
  text: string;
};

const RadioFilter = ({ options, type, text }: RadioFilterPropsType) => {
  const [filterSelection, setFilterSelection] = useState<SelectOptions>();
  const [checked, setChecked] = useState(false);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (option === "Not too busy") {
      setFilterSelection(SelectOptions.LOW);
    } else if (option === "A little busy") {
      setFilterSelection(SelectOptions.MEDIUM);
    } else {
      setFilterSelection(SelectOptions.HIGH);
    }
    setChecked(!checked);
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
          // *TO DO: need to fix this boolean value to toggle to be based on enum value using a map
          // checked={}
          onChange={handleFilter}
        />
      ))}
    </FilterComponent>
  );
};

export default RadioFilter;
