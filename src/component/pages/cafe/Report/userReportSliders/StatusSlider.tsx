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
  cafe: Cafe;
  icon: JSX.Element | undefined;
  optionValues: [{ value: number; label: string }];
};

const StatusSlider = ({
  filterSelection,
  handleFilter,
  cafe,
  icon,
  optionValues,
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
    <div className={classNames(styles.busynessSliderContainer)}>
      <div className={classNames(styles.busynessTitleContainer)}>
        {renderBusyIcon(cafe?.busyness)}
        <p className={classNames(styles.busynessTitle)}>Busyness</p>
      </div>
      <Slider
        aria-label="Restricted values"
        step={1}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valueText}
        marks={optionValues}
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

export default StatusSlider;
