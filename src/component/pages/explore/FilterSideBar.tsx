import React, { useState } from "react";
import RadioFilter from "component/common/Filter/RadioFilter";
import CheckboxFilter from "component/common/Filter/CheckboxFilter";
import FilterByDistanceSlider from "./exploreFilters/filterByDistanceSlider";
import Button from "component/common/Button";
import strings from "config/strings";
import styles from "./explore.module.scss";
import classNames from "classnames";

enum SelectOptions {
  LOW,
  MEDIUM,
  HIGH,
}

const FilterSideBar = () => {
  const [filterSelection, setFilterSelection] = useState<SelectOptions>();

  const updateFilterSelection = (filterSelection: SelectOptions): void => {
    setFilterSelection(filterSelection);
  };

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    console.log(filterSelection);
  };

  return (
    <React.Fragment>
      <form>
        <FilterByDistanceSlider />
        <RadioFilter
          options={[
            strings.list.busyness1,
            strings.list.busyness2,
            strings.list.busyness3,
          ]}
          type="radio"
          text={strings.explore.filterByBusyness}
          filterSelection={filterSelection}
          updateFilterSelection={updateFilterSelection}
        />
        <RadioFilter
          options={[
            strings.list.noisiness1,
            strings.list.noisiness2,
            strings.list.noisiness3,
          ]}
          type="radio"
          text={strings.explore.filterByNoiseLevel}
          filterSelection={filterSelection}
          updateFilterSelection={updateFilterSelection}
        />
        <CheckboxFilter
          options={[
            strings.list.price1,
            strings.list.price2,
            strings.list.price3,
          ]}
          type="checkbox"
          text={strings.explore.filterByPrice}
        />
        <CheckboxFilter
          options={[
            strings.list.amenities1,
            strings.list.amenities2,
            strings.list.amenities3,
          ]}
          type="checkbox"
          text={strings.explore.filterByAmenities}
        />
        <div className={classNames(styles.filterButtonWrapper)}>
          <Button text="Clear" type={"clear"} />
          <Button
            text="Filter"
            type={"filter"}
            buttonType={"submit"}
            onClick={handleClick}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default FilterSideBar;
