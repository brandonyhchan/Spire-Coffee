import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/Checkbox/Checkbox";
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
  const [isChecked, setIsChecked] = useState(false);

  // const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
  //   // setCheckedOption(event.target.value);
  //   setIsChecked(isChecked);
  // };

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      updateFilterSelected(true);
    } else {
      updateFilterSelected(false);
    }
  };

  return (
    <Filter text={strings.explore.filterByAmenities}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities1}
        value={strings.list.amenities1}
        // onChange={handleFilter}
        onClick={handleClick}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities2}
        value={strings.list.amenities2}
        // onChange={handleFilter}
        onClick={handleClick}
      ></List>
      {/* <List
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
      ></List> */}
    </Filter>
  );
};

export default FilterByAmenities;
