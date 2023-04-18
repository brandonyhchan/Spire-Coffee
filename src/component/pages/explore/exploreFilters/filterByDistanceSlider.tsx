/* eslint-disable prettier/prettier */
import React from "react";
import { Box, Slider } from "@mui/material";
import Filter from "component/common/FilterComponent/FilterComponent";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./filterComponentSlider.module.scss";

type DistanceFilterSliderPropsType = {
  filterSelection: number;
  handleFilter(data: number): void;
};

const distanceValue = [
  {
    value: 0,
    label: "0",
  },
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
];

const FilterByDistanceSlider = ({
  filterSelection,
  handleFilter,
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
    handleFilter(value);
  };

  return (
    <div className={classNames(styles.sliderFilterContainer)}>
      <Filter text={strings.explore.filter.filterByDistance}>
        <Box sx={{ width: 200 }}>
          <Slider
            aria-label="Restricted values"
            step={5}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valueText}
            marks={distanceValue}
            min={0}
            max={20}
            value={filterSelection}
            onChangeCommitted={getDistance}
            className={classNames(styles.slider)}
            sx={{
              fontFamily: "Figtree-Regular",
            }}
          />
        </Box>
      </Filter>
    </div>
  );
};

export default FilterByDistanceSlider;
