import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/List/List";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

interface FilterByBusynessProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByBusyness: React.FC<FilterByBusynessProps> = ({
  updateFilterSelected,
}) => {
  const [checked, setChecked] = useState(""); // pass in the state?
  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
    if (!checked) {
      updateFilterSelected(true);
    }
  };

  return (
    <Filter text={strings.explore.filterByBusyness}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.busyness1}
        value={strings.list.busyness1}
        checked={checked === strings.list.busyness1}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.busyness2}
        value={strings.list.busyness2}
        checked={checked === strings.list.busyness2}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.busyness3}
        value={strings.list.busyness3}
        checked={checked === strings.list.busyness3}
        onChange={handleFilter}
      ></List>
    </Filter>
  );
};

export default FilterByBusyness;
