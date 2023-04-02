import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/List/List";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

interface FilterByDistanceProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByDistance: React.FC<FilterByDistanceProps> = ({
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
    <Filter text={strings.explore.filterByDistance}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance1}
        value={strings.list.distance1}
        checked={checked === strings.list.distance1}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance2}
        value={strings.list.distance2}
        checked={checked === strings.list.distance2}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance3}
        value={strings.list.distance3}
        checked={checked === strings.list.distance3}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance4}
        value={strings.list.distance4}
        checked={checked === strings.list.distance4}
        onChange={handleFilter}
      ></List>
    </Filter>
  );
};

export default FilterByDistance;
