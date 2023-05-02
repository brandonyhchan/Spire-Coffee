import React, { useState, ChangeEvent, MouseEventHandler } from "react";
import RadioFilter, {
  SelectOptions,
} from "component/common/Filter/FilterType/RadioFilter";
import {
  busyOptions,
  noiseOptions,
  renderBusyIcon,
  renderNoiseIcon,
} from "component/common/Icons/Icons";
import Button from "component/common/Button";
import CheckboxFilter from "component/common/Filter/FilterType/CheckboxFilter";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FilterByDistanceSlider from "./exploreFilters/filterByDistanceSlider";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./filterSideBar.module.scss";

type FilterSideBarPropsType = {
  handleClick: MouseEventHandler;
  busynessState: SelectOptions | undefined;
  setBusynessState(data: SelectOptions): void;
  noiseState: SelectOptions | undefined;
  setNoiseState(data: SelectOptions): void;
  priceFilter: SelectOptions[];
  setPriceFilter(data: SelectOptions[]): void;
  distanceFilter: number;
  setDistanceFilter(data: number): void;
  showMobileFilters: any;
  mobileFiltersOpen: boolean;
};

const FilterSideBar = ({
  handleClick,
  busynessState,
  setBusynessState,
  noiseState,
  setNoiseState,
  priceFilter,
  setPriceFilter,
  distanceFilter,
  setDistanceFilter,
  showMobileFilters,
  mobileFiltersOpen,
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

  const closeFilterOnClick = () => {
    showMobileFilters();
  };

  return (
    <div className={classNames(styles.filterBarContainer)}>
      <CloseRoundedIcon
        className={classNames(styles.closeFiltersButton)}
        sx={{
          display: "none",
          "@media (max-width: 280px)": {
            display: "inline-block",
            margin: "25px 0 0 200px",
            fontSize: "30px",
          },
          "@media (min-width: 281px) and (max-width: 500px)": {
            display: "inline-block",
            margin: "25px 0 0 300px",
            fontSize: "30px",
          },
          "@media (min-width: 501px) and (max-width: 600px)": {
            display: "inline-block",
            margin: "25px 0 0 425px",
            fontSize: "30px",
          },
        }}
        onClick={closeFilterOnClick}
      />
      <form>
        <FilterByDistanceSlider
          filterSelection={distanceFilter}
          handleFilter={setDistanceFilter}
          mobileFiltersOpen={mobileFiltersOpen}
        />
        <RadioFilter
          options={busyOptions}
          type="radio"
          text={strings.explore.filter.filterByBusyness}
          filterSelection={busynessState}
          checked={busynessChecked}
          handleFilter={handleBusynessFilter}
          renderIcon={renderBusyIcon}
          mobileFiltersOpen={mobileFiltersOpen}
        />
        <RadioFilter
          options={noiseOptions}
          type="radio"
          text={strings.explore.filter.filterByNoiseLevel}
          filterSelection={noiseState}
          checked={noisinessChecked}
          handleFilter={handleNoisinessFilter}
          renderIcon={renderNoiseIcon}
          mobileFiltersOpen={mobileFiltersOpen}
        />
        <CheckboxFilter
          options={[
            SelectOptions.LOW,
            SelectOptions.MEDIUM,
            SelectOptions.HIGH,
          ]}
          label={[
            strings.list.price1,
            strings.list.price2,
            strings.list.price3,
          ]}
          type="checkbox"
          text={strings.explore.filter.filterByPrice}
          filterSelection={priceFilter}
          handleFilter={setPriceFilter}
          mobileFiltersOpen={mobileFiltersOpen}
        />
        <div className={classNames(styles.filterButtonWrapper)}>
          <Button
            text={strings.explore.filter.clearFilters}
            type="filter"
            buttonType="submit"
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
};

export default FilterSideBar;
