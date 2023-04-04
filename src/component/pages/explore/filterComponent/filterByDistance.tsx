import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import Input from "component/common/Input/Input";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

interface FilterByDistanceProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByDistance: React.FC<FilterByDistanceProps> = ({
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
    <Filter text={strings.explore.filterByDistance}>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.distance1}
        type="radio"
        value={strings.list.distance1}
        checked={checkedOption === strings.list.distance1}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.distance2}
        type="radio"
        value={strings.list.distance2}
        checked={checkedOption === strings.list.distance2}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.distance3}
        type="radio"
        value={strings.list.distance3}
        checked={checkedOption === strings.list.distance3}
        onChange={handleFilter}
      ></Input>
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.distance4}
        type="radio"
        value={strings.list.distance4}
        checked={checkedOption === strings.list.distance4}
        onChange={handleFilter}
      ></Input>
    </Filter>
  );
};

export default FilterByDistance;
