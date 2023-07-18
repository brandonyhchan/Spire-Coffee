/* eslint-disable prettier/prettier */
import React from "react";
import { Box, Slider } from "@mui/material";
import Filter from "component/common/Filter/FilterComponent/FilterComponent";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./filterComponentSlider.module.scss";

type DistanceFilterSliderPropsType = {
  filterSelection: number;
  handleFilter(data: number): void;
  mobileFiltersOpen: boolean;
  errorMessage: string;
  searchParams: URLSearchParams;
  setSearchParams(data: URLSearchParams): void;
};

const distanceValue = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 25,
    label: "25+",
  },
];

const FilterByDistanceSlider = ({
  filterSelection,
  handleFilter,
  mobileFiltersOpen,
  errorMessage,
  searchParams,
  setSearchParams,
}: DistanceFilterSliderPropsType) => {
  function valueText(distanceValue: number) {
    return `${distanceValue}km`;
  }

  function valueLabelFormat(value: number) {
    return (
      distanceValue.findIndex(
        (distanceValue) => distanceValue.value === value
      ) + 1
    );
  }

  //Gets the distance value to send to db
  const getDistance = (e: any, value: any) => {
    searchParams.set("distance", value);
    setSearchParams(searchParams);
    handleFilter(value);
  };

  return (
    <div className={classNames(styles.sliderFilterContainer)}>
      <Filter
        text={strings.explore.filter.filterByDistance}
        mobileFiltersOpen={mobileFiltersOpen}
      >
        <Box sx={{ width: 200 }}>
          <Slider
            aria-label="Restricted values"
            step={5}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valueText}
            marks={distanceValue}
            min={5}
            max={25}
            value={filterSelection}
            onChangeCommitted={getDistance}
            className={classNames(styles.slider)}
            sx={{
              fontFamily: "Figtree-Regular",
            }}
          />
          <span className={classNames(styles.distanceErrorMessage)}>
            {errorMessage}
          </span>
        </Box>
      </Filter>
    </div>
  );
};

export default FilterByDistanceSlider;
