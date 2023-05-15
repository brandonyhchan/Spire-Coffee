//We may be able to refactor this in the future to combine with icons.tsx
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./report.module.scss";
import strings from "config/strings";

export const busynessSliderValue = [
  {
    value: 0,
    label: strings.list.busyness1,
  },
  {
    value: 1,
    label: strings.list.busyness2,
  },
  {
    value: 2,
    label: strings.list.busyness3,
  },
];

export const noisinessSliderValue = [
  {
    value: 0,
    label: strings.list.noisiness1,
  },
  {
    value: 1,
    label: strings.list.noisiness2,
  },
  {
    value: 2,
    label: strings.list.noisiness3,
  },
];
