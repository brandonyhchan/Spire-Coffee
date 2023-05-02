import React from "react";

import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HourglassFullRoundedIcon from "@mui/icons-material/HourglassFullRounded";
import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import classNames from "classnames";
import strings from "config/strings";
import styles from "./Icons.module.scss";

export const busyOptions = [
  strings.list.busyness1,
  strings.list.busyness2,
  strings.list.busyness3,
];

export const noiseOptions = [
  strings.list.noisiness1,
  strings.list.noisiness2,
  strings.list.noisiness3,
];

export function renderBusyIcon(option?: string) {
  if (option === busyOptions[0] || option === "LOW") {
    return (
      <HourglassEmptyRoundedIcon className={classNames(styles.busynessIcon)} />
    );
  } else if (option === busyOptions[1] || option === "MEDIUM") {
    return (
      <HourglassBottomRoundedIcon className={classNames(styles.busynessIcon)} />
    );
  } else if (option === busyOptions[2] || option === "HIGH") {
    return (
      <HourglassFullRoundedIcon className={classNames(styles.busynessIcon)} />
    );
  } else {
    return undefined;
  }
}

export function renderNoiseIcon(option?: string) {
  if (option === noiseOptions[0] || option === "LOW") {
    return (
      <VolumeMuteRoundedIcon className={classNames(styles.noisinessIcon)} />
    );
  } else if (option === noiseOptions[1] || option === "MEDIUM") {
    return (
      <VolumeDownRoundedIcon className={classNames(styles.noisinessIcon)} />
    );
  } else if (option === noiseOptions[2] || option === "HIGH") {
    return <VolumeUpRoundedIcon className={classNames(styles.noisinessIcon)} />;
  } else {
    return undefined;
  }
}

export function renderPrice(option?: string) {
  if (option === "LOW") {
    return (
      <div className={classNames(styles.priceIconGroup)}>
        <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
      </div>
    );
  } else if (option === "MEDIUM") {
    return (
      <div className={classNames(styles.priceIconGroup)}>
        <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
        <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
      </div>
    );
  } else if (option === "HIGH") {
    return (
      <div className={classNames(styles.priceIconGroup)}>
        <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
        <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
        <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
      </div>
    );
  }
}
