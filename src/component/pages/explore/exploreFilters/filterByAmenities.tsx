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
  const [filterSelection, setFilterSelection] = useState<{
    selections: string[];
  }>({ selections: [] });
  const options = [
    strings.list.amenities1,
    strings.list.amenities2,
    strings.list.amenities3,
  ];

  const [checkedOption, setCheckedOption] = useState("");

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedOption(event.target.value);
    if (!checkedOption) {
      updateFilterSelected(true);
    }
  };

  function handleSelectedFilters(key: string) {
    const selection = filterSelection.selections;
    const findOption = selection.indexOf(key);
    if (findOption > -1) {
      selection.splice(findOption, 1);
    } else {
      selection.push(key);
    }

    setFilterSelection({
      selections: selection,
    });
    console.log(filterSelection);
  }

  return (
    <Filter text={strings.explore.filterByAmenities}>
      {options.map((option) => (
        <Input
          key={option}
          className={classNames(styles.listWrapper)}
          text={option}
          type="checkbox"
          value={option}
          onChange={() => handleSelectedFilters(option)}
          checked={filterSelection.selections.includes(option)}
        />
      ))}
    </Filter>
  );
};

export default FilterByAmenities;
