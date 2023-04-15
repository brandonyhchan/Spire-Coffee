import React from "react";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import strings from "config/strings";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";
import { SelectOptions } from "./RadioFilter";

type CheckboxFilterPropsType = {
  options: SelectOptions[];
  type: string;
  text: string;
  filterSelection: string[];
  handleFilter: (option: SelectOptions) => void;
};

const CheckboxFilter = ({
  options,
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
        value={options[0]}
        onChange={() => handleFilter(options[0])}
      />
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price2}
        type={type}
        value={options[1]}
        onChange={() => handleFilter(options[1])}
      />
      <FilterOption
        className={classNames(styles.listWrapper)}
        text={strings.list.price3}
        type={type}
        value={options[2]}
        onChange={() => handleFilter(options[2])}
      />
    </FilterComponent>
  );
};

export default CheckboxFilter;
