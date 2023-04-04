import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/Checkbox/Checkbox";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

interface FilterByNoiseLevelProps {
  updateFilterSelected: (arg: boolean) => void;
}

const FilterByNoiseLevel: React.FC<FilterByNoiseLevelProps> = ({
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
    <Filter text={strings.explore.filterByNoiseLevel}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness1}
        value={strings.list.quietness1}
        checked={checkedOption === strings.list.quietness1}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness2}
        value={strings.list.quietness2}
        checked={checkedOption === strings.list.quietness2}
        onChange={handleFilter}
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness3}
        value={strings.list.quietness3}
        checked={checkedOption === strings.list.quietness3}
        onChange={handleFilter}
      ></List>
    </Filter>
  );
};

export default FilterByNoiseLevel;
