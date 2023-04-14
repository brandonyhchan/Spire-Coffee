import React, { useState, ChangeEvent, MouseEventHandler } from "react";
import RadioFilter, {
  SelectOptions,
} from "component/common/Filter/RadioFilter";
import CheckboxFilter from "component/common/Filter/CheckboxFilter";
import FilterByDistanceSlider from "./exploreFilters/filterByDistanceSlider";
import Button from "component/common/Button";
import strings from "config/strings";
import styles from "./explore.module.scss";
import classNames from "classnames";

type FilterSideBarPropsType = {
  handleClick: MouseEventHandler;
  busynessState: SelectOptions | undefined;
  setBusynessState(data: SelectOptions): void;
  noiseState: SelectOptions | undefined;
  setNoiseState(data: SelectOptions): void;
};

const FilterSideBar = ({
  handleClick,
  busynessState,
  setBusynessState,
  noiseState,
  setNoiseState,
}: FilterSideBarPropsType) => {
  const [busynessChecked, setBusynessChecked] = useState("");
  const [noisinessChecked, setNoisinessChecked] = useState("");

  const handleBusynessFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (option === "Not too busy") {
      setBusynessState(SelectOptions.LOW);
    } else if (option === "A little busy") {
      setBusynessState(SelectOptions.MEDIUM);
    } else {
      setBusynessState(SelectOptions.HIGH);
    }
    setBusynessChecked(option);
  };

  const handleNoisinessFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (option === "Quiet") {
      setNoiseState(SelectOptions.LOW);
    } else if (option === "A little noisy") {
      setNoiseState(SelectOptions.MEDIUM);
    } else {
      setNoiseState(SelectOptions.HIGH);
    }
    setNoisinessChecked(option);
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
          filterSelection={busynessState}
          checked={busynessChecked}
          handleFilter={handleBusynessFilter}
        />
        <RadioFilter
          options={[
            strings.list.noisiness1,
            strings.list.noisiness2,
            strings.list.noisiness3,
          ]}
          type="radio"
          text={strings.explore.filterByNoiseLevel}
          filterSelection={noiseState}
          checked={noisinessChecked}
          handleFilter={handleNoisinessFilter}
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
            type="filter"
            buttonType={"submit"}
            onClick={handleClick}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default FilterSideBar;
