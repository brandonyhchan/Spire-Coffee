import React, { useState, ChangeEvent, MouseEventHandler } from "react";
import RadioFilter, {
  SelectOptions,
} from "component/common/Filter/FilterType/RadioFilter";
import CheckboxFilter from "component/common/Filter/FilterType/CheckboxFilter";
import FilterByDistanceSlider from "./exploreFilters/filterByDistanceSlider";
import Button from "component/common/Button";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HourglassFullRoundedIcon from "@mui/icons-material/HourglassFullRounded";

import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

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
  showMobileFilters: () => void | null;
  mobileFiltersOpen: boolean;
  distanceFilterError: string;
  searchParams: URLSearchParams;
  setSearchParams(data: URLSearchParams): void;
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
  distanceFilterError,
  searchParams,
  setSearchParams,
}: FilterSideBarPropsType) => {
  const busyOptions = [
    strings.list.busyness1,
    strings.list.busyness2,
    strings.list.busyness3,
  ];

  const noiseOptions = [
    strings.list.noisiness1,
    strings.list.noisiness2,
    strings.list.noisiness3,
  ];

  const options = [SelectOptions.LOW, SelectOptions.MEDIUM, SelectOptions.HIGH];

  const [busynessChecked, setBusynessChecked] = useState(
    searchParams?.get("busyness") || ""
  );
  const [noisinessChecked, setNoisinessChecked] = useState(
    searchParams?.get("noisiness") || ""
  );

  const handleBusynessFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (option === options[0]) {
      setBusynessState(SelectOptions.LOW);
      searchParams.set("busyness", SelectOptions.LOW);
    } else if (option === options[1]) {
      setBusynessState(SelectOptions.MEDIUM);
      searchParams.set("busyness", SelectOptions.MEDIUM);
    } else {
      setBusynessState(SelectOptions.HIGH);
      searchParams.set("busyness", SelectOptions.HIGH);
    }
    setSearchParams(searchParams);
    setBusynessChecked(option);
  };

  const handleNoisinessFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (option === options[0]) {
      setNoiseState(SelectOptions.LOW);
      searchParams.set("noisiness", SelectOptions.LOW);
    } else if (option === options[1]) {
      setNoiseState(SelectOptions.MEDIUM);
      searchParams.set("noisiness", SelectOptions.MEDIUM);
    } else {
      setNoiseState(SelectOptions.HIGH);
      searchParams.set("noisiness", SelectOptions.HIGH);
    }
    setSearchParams(searchParams);
    setNoisinessChecked(option);
  };

  function renderBusyIcon(option: string) {
    if (option === options[0]) {
      return (
        <HourglassEmptyRoundedIcon
          className={classNames(styles.busynessIcon)}
        />
      );
    } else if (option === options[1]) {
      return (
        <HourglassBottomRoundedIcon
          className={classNames(styles.busynessIcon)}
        />
      );
    } else if (option === options[2]) {
      return (
        <HourglassFullRoundedIcon className={classNames(styles.busynessIcon)} />
      );
    } else {
      return undefined;
    }
  }

  function renderNoiseIcon(option: string) {
    if (option === options[0]) {
      return (
        <VolumeMuteRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else if (option === options[1]) {
      return (
        <VolumeDownRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else if (option === options[2]) {
      return (
        <VolumeUpRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else {
      return undefined;
    }
  }

  const closeFilterOnClick = () => {
    showMobileFilters();
  };

  return (
    <div>
      <div className={classNames(styles.closeButtonContainer)}>
        <CloseRoundedIcon
          className={classNames(styles.closeFiltersButton)}
          sx={{
            display: "none",
            "@media (min-width: 280px)": {
              display: "inline-block",
              margin: "25px 25px 0 0",
              fontSize: "30px",
            },
          }}
          onClick={closeFilterOnClick}
        />
      </div>
      <form>
        <FilterByDistanceSlider
          filterSelection={distanceFilter}
          handleFilter={setDistanceFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          errorMessage={distanceFilterError}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <RadioFilter
          options={options}
          type="radio"
          text={strings.explore.filter.filterByBusyness}
          filterSelection={busynessState}
          checked={busynessChecked}
          handleFilter={handleBusynessFilter}
          renderIcon={renderBusyIcon}
          mobileFiltersOpen={mobileFiltersOpen}
          label={busyOptions}
        />
        <RadioFilter
          options={options}
          type="radio"
          text={strings.explore.filter.filterByNoiseLevel}
          filterSelection={noiseState}
          checked={noisinessChecked}
          handleFilter={handleNoisinessFilter}
          renderIcon={renderNoiseIcon}
          mobileFiltersOpen={mobileFiltersOpen}
          label={noiseOptions}
        />
        <CheckboxFilter
          options={options}
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
