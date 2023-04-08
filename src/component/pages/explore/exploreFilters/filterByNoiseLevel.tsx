import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/FilterComponent/FilterComponent";
import Input from "component/common/FilterOption/FilterOption";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

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
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness1}
        type="radio"
        value={strings.list.quietness1}
        checked={checkedOption === strings.list.quietness1}
        onChange={handleFilter}
      />
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness2}
        type="radio"
        value={strings.list.quietness2}
        checked={checkedOption === strings.list.quietness2}
        onChange={handleFilter}
      />
      <Input
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness3}
        type="radio"
        value={strings.list.quietness3}
        checked={checkedOption === strings.list.quietness3}
        onChange={handleFilter}
      />
    </Filter>
  );
};

export default FilterByNoiseLevel;
