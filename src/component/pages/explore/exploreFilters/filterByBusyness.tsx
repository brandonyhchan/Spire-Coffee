import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/FilterComponent/FilterComponent";
import Input from "component/common/FilterOption/FilterOption";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

interface FilterByBusynessProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByBusyness: React.FC<FilterByBusynessProps> = ({
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
    <Filter text={strings.explore.filterByBusyness}>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.busyness1}
        type="radio"
        value={strings.list.busyness1}
        checked={checkedOption === strings.list.busyness1}
        onChange={handleFilter}
      />
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.busyness2}
        type="radio"
        value={strings.list.busyness2}
        checked={checkedOption === strings.list.busyness2}
        onChange={handleFilter}
      />
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.busyness3}
        type="radio"
        value={strings.list.busyness3}
        checked={checkedOption === strings.list.busyness3}
        onChange={handleFilter}
      />
    </Filter>
  );
};

export default FilterByBusyness;
