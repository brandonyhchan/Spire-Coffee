import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/FilterComponent/FilterComponent";
import Input from "component/common/FilterOption/FilterOption";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

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
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities1}
        type="checkbox"
        value={strings.list.amenities1}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities2}
        type="checkbox"
        value={strings.list.amenities2}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities3}
        type="checkbox"
        value={strings.list.amenities3}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities4}
        type="checkbox"
        value={strings.list.amenities4}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities5}
        type="checkbox"
        value={strings.list.amenities5}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities6}
        type="checkbox"
        value={strings.list.amenities6}
        onChange={handleFilter}
      ></Input>
    </Filter>
  );
};

export default FilterByAmenities;
