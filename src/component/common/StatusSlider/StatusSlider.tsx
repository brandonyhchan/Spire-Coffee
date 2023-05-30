import React from "react";
import { Slider } from "@mui/material";
import { SelectOptions } from "../Filter/FilterType/RadioFilter";
import classNames from "classnames";
import styles from "./statusSlider.module.scss";

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

  const getStatusLevel = (e: any, value: any) => {
    if (value === 0) {
      handleFilter(SelectOptions.LOW);
    } else if (value === 1) {
      handleFilter(SelectOptions.MEDIUM);
    } else {
      handleFilter(SelectOptions.HIGH);
    }
  };

  function changeValueToNumber(filterSelection: SelectOptions | undefined) {
    if (filterSelection === SelectOptions.LOW) {
      return 0;
    } else if (filterSelection === SelectOptions.MEDIUM) {
      return 1;
    } else {
      return 2;
    }
  }

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
        onChangeCommitted={getStatusLevel}
        sx={{
          fontFamily: "Figtree-Regular",
        }}
      />
    </div>
  );
};

export default StatusSlider;
