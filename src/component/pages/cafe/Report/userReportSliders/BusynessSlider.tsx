import React from "react";
import { Slider } from "@mui/material";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./busynessSlider.module.scss";

type BusynessSliderPropsType = {
  filterSelection: number;
  handleFilter(data: number): void;
};

const busynessValue = [
  {
    value: 0,
    label: "low",
  },
  {
    value: 1,
    label: "medium",
  },
  {
    value: 2,
    label: "high",
  },
];

const BusynessSlider = ({
  filterSelection,
  handleFilter,
}: BusynessSliderPropsType) => {
  function valueText(busynessValue: number) {
    return `${busynessValue}`;
  }

  function valueLabelFormat(value: number) {
    return (
      busynessValue.findIndex(
        (busynessValue) => busynessValue.value === value
      ) + 1
    );
  }

  //Gets the distance value to send to db
  const getBusyness = (e: any, value: any) => {
    handleFilter(value);
    console.log(value);
  };

  return (
    <div className={classNames(styles.busynessSliderContainer)}>
      <p className={classNames(styles.busynessTitle)}>Busyness</p>
      <Slider
        aria-label="Restricted values"
        step={1}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valueText}
        marks={busynessValue}
        min={0}
        max={2}
        value={filterSelection}
        onChangeCommitted={getBusyness}
        sx={{
          fontFamily: "Figtree-Regular",
        }}
      />
    </div>
  );
};

export default BusynessSlider;
