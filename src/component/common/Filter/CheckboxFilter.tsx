import React, { useState } from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

type CheckboxFilterPropsType = {
  options: string[];
  type: string;
  text: string;
};

const CheckboxFilter = ({ options, type, text }: CheckboxFilterPropsType) => {
  const [filterSelection, setFilterSelection] = useState<{
    selections: string[];
  }>({ selections: [] });

  function handleSelectedFilters(key: string) {
    const selection = filterSelection.selections;
    const findOption = selection.indexOf(key);
    if (findOption > -1) {
      selection.splice(findOption, 1);
    } else {
      selection.push(key);
    }

    setFilterSelection({
      selections: selection,
    });
    console.log(filterSelection);
  }

  return (
    <FilterComponent text={text}>
      {options.map((option) => (
        <FilterOption
          key={option}
          className={classNames(styles.listWrapper)}
          text={option}
          type={type}
          value={option}
          onChange={() => handleSelectedFilters(option)}
          checked={filterSelection.selections.includes(option)}
        />
      ))}
    </FilterComponent>
  );
};

export default CheckboxFilter;
