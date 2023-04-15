import React from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import strings from "config/strings";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";
import { SelectOptions } from "./RadioFilter";

type CheckboxFilterPropsType = {
  type: string;
  text: string;
  filterSelection: string[];
  handleFilter: (option: SelectOptions) => void;
};

const CheckboxFilter = ({
  type,
  text,
  handleFilter,
}: CheckboxFilterPropsType) => {
  return (
    <FilterComponent text={text}>
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price1}
        type={type}
        value={SelectOptions.LOW}
        onChange={() => handleFilter}
      />
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price2}
        type={type}
        value={SelectOptions.MEDIUM}
        onChange={() => handleFilter(SelectOptions.MEDIUM)}
      />
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price3}
        type={type}
        value={SelectOptions.HIGH}
        onChange={() => handleFilter(SelectOptions.HIGH)}
      />
    </FilterComponent>
  );
};

export default CheckboxFilter;
