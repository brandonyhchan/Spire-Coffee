import React from "react";
import { Slider } from "@mui/material";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./statusSlider.module.scss";
import { Cafe } from "types/api/cafe";
import { SelectOptions } from "../Filter/FilterType/RadioFilter";

type StatusSliderPropsType = {
  filterSelection: SelectOptions | undefined;
  handleFilter(data: SelectOptions): void;
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

  function changeValueToNumber(filterSelection: SelectOptions | undefined) {
    if (filterSelection === SelectOptions.LOW) {
      return 0;
    } else if (filterSelection === SelectOptions.MEDIUM) {
      return 1;
    } else if (filterSelection === SelectOptions.HIGH) {
      return 2;
    } else {
      return undefined;
    }
  }

  console.log(filterSelection);

  return (
    <div className={classNames(styles.sliderContainer)}>
      <div className={classNames(styles.titleContainer)}>
        {icon}
        <p className={classNames(styles.sliderTitle)}>{statusTitle}</p>
      </div>
      <Slider
        className={classNames(styles.slider)}
        aria-label="Restricted values"
        step={step}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valueText}
        marks={optionValues}
        min={minValue}
        max={maxValue}
        value={changeValueToNumber(filterSelection)}
        onChangeCommitted={getBusyness}
        sx={{
          fontFamily: "Figtree-Regular",
        }}
      />
    </div>
  );
};

export default StatusSlider;
