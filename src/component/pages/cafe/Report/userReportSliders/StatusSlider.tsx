import React from "react";
import { Slider } from "@mui/material";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./statusSlider.module.scss";
import { Cafe } from "types/api/cafe";

import { renderBusyIcon, renderBusyText } from "component/common/Icons/Icons";

type StatusSliderPropsType = {
  filterSelection: number;
  handleFilter(data: number): void;
  cafe: Cafe | undefined;
  icon: JSX.Element | undefined;
  optionValues: { value: number; label: string }[];
  maxValue: number;
  minValue: number;
  step: number;
  statusTitle: string;
};

const StatusSlider = ({
  filterSelection,
  handleFilter,
  cafe,
  icon,
  optionValues,
  maxValue,
  minValue,
  step,
  statusTitle,
}: StatusSliderPropsType) => {
  function valueText(value: number) {
    return `${value}`;
  }

  function valueLabelFormat(value: number) {
    return (
      optionValues.findIndex((optionValues) => optionValues.value === value) + 1
    );
  }

  //Gets the distance value to send to db
  const getBusyness = (e: any, value: any) => {
    handleFilter(value);
    console.log(value);
  };

  return (
    <div className={classNames(styles.sliderContainer)}>
      <div className={classNames(styles.titleContainer)}>
        {icon}
        <p className={classNames(styles.sliderTitle)}>{statusTitle}</p>
      </div>
      <Slider
        aria-label="Restricted values"
        step={step}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valueText}
        marks={optionValues}
        min={minValue}
        max={maxValue}
        value={filterSelection}
        onChangeCommitted={getBusyness}
        sx={{
          fontFamily: "Figtree-Regular",
        }}
      />
    </div>
  );
};

export default StatusSlider;
