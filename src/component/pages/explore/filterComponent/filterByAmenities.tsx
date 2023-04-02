import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/List/List";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

interface FilterByAmenitiesProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByAmenities: React.FC<FilterByAmenitiesProps> = ({
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
    <Filter text={strings.explore.filterByAmenities}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities1}
        value={strings.list.amenities1}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities2}
        value={strings.list.amenities2}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities3}
        value={strings.list.amenities3}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities4}
        value={strings.list.amenities4}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities5}
        value={strings.list.amenities5}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities6}
        value={strings.list.amenities6}
        onChange={handleFilter}
      ></List>
    </Filter>
  );
};

export default FilterByAmenities;
