/* eslint-disable prettier/prettier */
import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/FilterComponent/FilterComponent";
import strings from "config/strings";
import classNames from "classnames";
import styles from "./filterComponentSlider.module.scss";;
import { Box, Slider } from "@mui/material";

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

function valueText(distanceValue: number) {
  return `${distanceValue}km`;
}

function valueLabelFormat(value: number) {
  return (
    distanceValue.findIndex((distanceValue) => distanceValue.value === value) +
    1
  );
}

//Gets the distance value to send to db
const getDistance=(e: any, value: any)=>{
  console.log(value)
}

function FilterByDistanceSlider() {
  return (
    <div  className={classNames(styles.sliderFilterContainer)}>
      <Filter text={strings.explore.filterByDistance}>
        <Box sx={{ width: 220 }}>
          <Slider
            aria-label="Restricted values"
            step={5}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valueText}
            marks={distanceValue}
            min={0}
            max={20}
            onChangeCommitted={getDistance}
            className={classNames(styles.slider)}
          />
        </Box>
      </Filter>
    </div>
  );
}

export default FilterByDistanceSlider;
