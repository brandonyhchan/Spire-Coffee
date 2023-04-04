import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import Checkbox from "component/common/Checkbox/Checkbox";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

interface FilterByAmenitiesProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByAmenities: React.FC<FilterByAmenitiesProps> = ({
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
    <Filter text={strings.explore.filterByAmenities}>
      <Checkbox
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities1}
        value={strings.list.amenities1}
        onChange={handleFilter}
      ></Checkbox>
      <Checkbox
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities2}
        value={strings.list.amenities2}
        onChange={handleFilter}
      ></Checkbox>
      <Checkbox
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities3}
        value={strings.list.amenities3}
        onChange={handleFilter}
      ></Checkbox>
      <Checkbox
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities4}
        value={strings.list.amenities4}
        onChange={handleFilter}
      ></Checkbox>
      <Checkbox
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities5}
        value={strings.list.amenities5}
        onChange={handleFilter}
      ></Checkbox>
      <Checkbox
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities6}
        value={strings.list.amenities6}
        onChange={handleFilter}
      ></Checkbox>
    </Filter>
  );
};

export default FilterByAmenities;
