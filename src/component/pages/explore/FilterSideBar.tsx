import React, { useState, ChangeEvent, MouseEventHandler } from "react";
import RadioFilter, {
  SelectOptions,
} from "component/common/Filter/RadioFilter";
import CheckboxFilter from "component/common/Filter/CheckboxFilter";
import FilterByDistanceSlider from "./exploreFilters/filterByDistanceSlider";
import Button from "component/common/Button";

import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HourglassFullRoundedIcon from "@mui/icons-material/HourglassFullRounded";

import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

import classNames from "classnames";
import strings from "config/strings";
import styles from "./explore.module.scss";

type FilterSideBarPropsType = {
  handleClick: MouseEventHandler;
  busynessState: SelectOptions | undefined;
  setBusynessState(data: SelectOptions): void;
  noiseState: SelectOptions | undefined;
  setNoiseState(data: SelectOptions): void;
  // sortState: string | undefined;
  // setSortState(data: string): void;
  priceFilter: SelectOptions[];
  setPriceFilter(data: SelectOptions[]): void;
  distanceFilter: number;
  setDistanceFilter(data: number): void;
};

const FilterSideBar = ({
  handleClick,
  busynessState,
  setBusynessState,
  noiseState,
  setNoiseState,
  // sortState,
  // setSortState,
  priceFilter,
  setPriceFilter,
  distanceFilter,
  setDistanceFilter,
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

  // const sortOptions = [
  //   strings.list.sort1,
  //   strings.list.sort2,
  //   strings.list.sort3,
  //   strings.list.sort4,
  // ];

  const [busynessChecked, setBusynessChecked] = useState("");
  const [noisinessChecked, setNoisinessChecked] = useState("");
  const [sortChecked, setSortChecked] = useState("");

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

  // const handleSortFilter = (event: ChangeEvent<HTMLInputElement>) => {
  //   const option = event.target.value;
  //   if (option === strings.list.sort1) {
  //     setSortState("A-Z");
  //   } else if (option === strings.list.sort2) {
  //     setSortState("Z-A");
  //   } else if (option === strings.list.sort3) {
  //     setSortState("Low to High");
  //   } else {
  //     setSortState("High to Low");
  //   }
  //   setSortChecked(option);
  // };

  function renderBusyIcon(option: string) {
    if (option === busyOptions[0]) {
      return (
        <HourglassEmptyRoundedIcon
          className={classNames(styles.busynessIcon)}
        />
      );
    } else if (option === busyOptions[1]) {
      return (
        <HourglassBottomRoundedIcon
          className={classNames(styles.busynessIcon)}
        />
      );
    } else if (option === busyOptions[2]) {
      return (
        <HourglassFullRoundedIcon className={classNames(styles.busynessIcon)} />
      );
    } else {
      return undefined;
    }
  }

  function renderNoiseIcon(option: string) {
    if (option === noiseOptions[0]) {
      return (
        <VolumeMuteRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else if (option === noiseOptions[1]) {
      return (
        <VolumeDownRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else if (option === noiseOptions[2]) {
      return (
        <VolumeUpRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else {
      return undefined;
    }
  }

  return (
    <form>
      <FilterByDistanceSlider
        filterSelection={distanceFilter}
        handleFilter={setDistanceFilter}
      />
      <RadioFilter
        options={busyOptions}
        type="radio"
        text={strings.explore.filter.filterByBusyness}
        filterSelection={busynessState}
        checked={busynessChecked}
        handleFilter={handleBusynessFilter}
        renderIcon={renderBusyIcon}
      />
      <RadioFilter
        options={noiseOptions}
        type="radio"
        text={strings.explore.filter.filterByNoiseLevel}
        filterSelection={noiseState}
        checked={noisinessChecked}
        handleFilter={handleNoisinessFilter}
        renderIcon={renderNoiseIcon}
      />
      <CheckboxFilter
        options={[SelectOptions.LOW, SelectOptions.MEDIUM, SelectOptions.HIGH]}
        label={[strings.list.price1, strings.list.price2, strings.list.price3]}
        type="checkbox"
        text={strings.explore.filter.filterByPrice}
        filterSelection={priceFilter}
        handleFilter={setPriceFilter}
      />
      {/* <RadioFilter
        options={sortOptions}
        type="radio"
        text={strings.explore.filter.sortBy}
        filterSelection={sortState}
        checked={sortChecked}
        handleFilter={handleSortFilter}
        renderIcon={() => undefined}
      /> */}
      <div className={classNames(styles.filterButtonWrapper)}>
        <Button
          text={strings.explore.filter.clearFilters}
          type="filter"
          buttonType="submit"
          onClick={handleClick}
        />
      </div>
    </form>
  );
};

export default FilterSideBar;
