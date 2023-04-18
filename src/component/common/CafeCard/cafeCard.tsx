import React from "react";
import { Grid, Typography } from "@mui/material";

import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HourglassFullRoundedIcon from "@mui/icons-material/HourglassFullRounded";

import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import classNames from "classnames";
import strings from "config/strings";
import styles from "./cafeCard.module.scss";

import useMediaQuery from "@mui/material/useMediaQuery";

type CafeCardPropsType = {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  profilePhotoURL: string;
  busyness: string;
  noisiness: string;
  price: string;
};

const CafeCard = ({
  name,
  street,
  city,
  province,
  profilePhotoURL,
  busyness,
  noisiness,
  price,
}: CafeCardPropsType) => {
  const getNoisinessIcon = (icon: string) => {
    switch (icon) {
      case "LOW":
        return (
          <VolumeMuteRoundedIcon className={classNames(styles.noisinessIcon)} />
        );
      case "MEDIUM":
        return (
          <VolumeDownRoundedIcon className={classNames(styles.noisinessIcon)} />
        );
      case "HIGH":
        return (
          <VolumeUpRoundedIcon className={classNames(styles.noisinessIcon)} />
        );
      default:
        return "LOW";
    }
  };

  const getBusynessIcon = (icon: string) => {
    switch (icon) {
      case "LOW":
        return (
          <HourglassEmptyRoundedIcon
            className={classNames(styles.busynessIcon)}
          />
        );
      case "MEDIUM":
        return (
          <HourglassBottomRoundedIcon
            className={classNames(styles.busynessIcon)}
          />
        );
      case "HIGH":
        return (
          <HourglassFullRoundedIcon
            className={classNames(styles.busynessIcon)}
          />
        );
      default:
        return "LOW";
    }
  };

  const getPriceIcon = (icon: string) => {
    switch (icon) {
      case "LOW":
        return (
          <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
        );
      case "MEDIUM":
        return (
          <div>
            <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
            <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
          </div>
        );
      case "HIGH":
        return (
          <div>
            <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
            <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
            <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
          </div>
        );
      default:
        return "LOW";
    }
  };

  const mobileSize = useMediaQuery("(max-width:600px)");

  return (
    <div className={classNames(styles.cafeCard)}>
      <div className={classNames(styles.logo)}>
        <img src={profilePhotoURL} />
      </div>
      <div className={classNames(styles.cafeCardInfo)}>
        <Grid item zeroMinWidth>
          <Typography
            className={classNames(styles.mobilefont)}
            noWrap
            fontFamily={"Figtree-Regular"}
            fontSize={mobileSize ? 15 : 20}
            fontWeight={"600"}
          >
            {name}
          </Typography>
          <Typography
            fontSize={mobileSize ? 15 : 18}
            fontFamily={"Figtree-Regular"}
          >
            {street}
          </Typography>
          <Typography
            fontSize={mobileSize ? 15 : 18}
            fontFamily={"Figtree-Regular"}
          >
            {city}, {province}
          </Typography>
        </Grid>
        <div className={classNames(styles.cafeCardIcons)}>
          <div className={classNames(styles.busyness)}>
            {getBusynessIcon(busyness)}
            <label>{strings.cafeCard.busynessLabel}</label>
          </div>
          <div className={classNames(styles.noisiness)}>
            {getNoisinessIcon(noisiness)}
            <label>{strings.cafeCard.noisinessLabel}</label>
          </div>
          <div className={classNames(styles.priceIconGroup)}>
            {getPriceIcon(price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;
