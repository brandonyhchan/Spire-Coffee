import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/FilterComponent/FilterComponent";
import Input from "component/common/FilterOption/FilterOption";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

interface FilterByPriceProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByPrice: React.FC<FilterByPriceProps> = ({
  updateFilterSelected,
}) => {
  const [checkedOption, setCheckedOption] = useState(""); // pass in the state?
  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedOption(event.target.value);
    if (!checkedOption) {
      updateFilterSelected(true);
    }
  };

  return (
    <Filter text={strings.explore.filterByPrice}>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.price1}
        type="checkbox"
        value={strings.list.price1}
        onChange={handleFilter}
      />
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.price2}
        type="checkbox"
        value={strings.list.price2}
        onChange={handleFilter}
      />
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.price3}
        type="checkbox"
        value={strings.list.price3}
        onChange={handleFilter}
      />
    </Filter>
  );
};

export default FilterByPrice;
