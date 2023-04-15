import React, { useState } from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import strings from "config/strings";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";
import { SelectOptions } from "component/pages/explore/FilterSideBar";

type CheckboxFilterPropsType = {
  type: string;
  text: string;
  filterSelection: string[];
  handleFilter: (selections: string[]) => void;
};

const CheckboxFilter = ({
  type,
  text,
  handleFilter,
}: CheckboxFilterPropsType) => {
  const [filterSelection, setFilterSelection] = useState<SelectOptions[]>([]);

  function handleSelectedFilters(option: SelectOptions) {
    const findOption = filterSelection.indexOf(option);
    if (findOption > -1) {
      filterSelection.splice(findOption, 1);
    } else {
      filterSelection.push(option);
    }

    setFilterSelection(filterSelection);
    handleFilter(filterSelection);
    console.log(filterSelection);
  }

  return (
    <FilterComponent text={text}>
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price1}
        type={type}
        value={SelectOptions.LOW}
        onChange={() => handleSelectedFilters(SelectOptions.LOW)}
      />
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price2}
        type={type}
        value={SelectOptions.MEDIUM}
        onChange={() => handleSelectedFilters(SelectOptions.MEDIUM)}
      />
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price3}
        type={type}
        value={SelectOptions.HIGH}
        onChange={() => handleSelectedFilters(SelectOptions.HIGH)}
      />
    </FilterComponent>
  );
};

export default CheckboxFilter;
