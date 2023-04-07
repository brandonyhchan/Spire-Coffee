import React, { useState } from "react";
import { CafeData } from "../../pages/explore/mockCafeData";
import Logo from "assets/images/placeholder-logo.jpg";
import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HourglassFullRoundedIcon from "@mui/icons-material/HourglassFullRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import classNames from "classnames";
import styles from "./cafeCard.module.scss";
import strings from "config/strings";
import { Grid, Typography } from "@mui/material";

type CafeCardPropsType = {
  query: string;
};

const CafeCard = ({ query }: CafeCardPropsType) => {
  const getNoisinessIcon = (icon: number) => {
    switch (icon) {
      case 1:
        return (
          <VolumeMuteRoundedIcon
            className={classNames(styles.noisinessIcon)}
          ></VolumeMuteRoundedIcon>
        );
      case 2:
        return (
          <VolumeDownRoundedIcon
            className={classNames(styles.noisinessIcon)}
          ></VolumeDownRoundedIcon>
        );
      case 3:
        return (
          <VolumeUpRoundedIcon
            className={classNames(styles.noisinessIcon)}
          ></VolumeUpRoundedIcon>
        );
      default:
        return null;
    }
  };

  const getBusynessIcon = (icon: number) => {
    switch (icon) {
      case 1:
        return (
          <HourglassEmptyRoundedIcon
            className={classNames(styles.busynessIcon)}
          ></HourglassEmptyRoundedIcon>
        );
      case 2:
        return (
          <HourglassBottomRoundedIcon
            className={classNames(styles.busynessIcon)}
          ></HourglassBottomRoundedIcon>
        );
      case 3:
        return (
          <HourglassFullRoundedIcon
            className={classNames(styles.busynessIcon)}
          ></HourglassFullRoundedIcon>
        );
      default:
        return null;
    }
  };
  return (
    <div className={classNames(styles.cafeCardContainer)}>
      {CafeData.filter((cafe) => {
        if (query === "") {
          return cafe;
        } else if (cafe.name.toLowerCase().includes(query.toLowerCase())) {
          return cafe;
        }
      }).map((cafe, index) => (
        <div key={index} className={classNames(styles.cafeCard)}>
          <div className={classNames(styles.logo)}>
            <img src={Logo} alt={Logo} />
          </div>
          <div className={classNames(styles.cafeCardInfo)}>
            <Grid item zeroMinWidth className={classNames(styles.header)}>
              <Typography noWrap fontSize={20}>
                {cafe.name}
              </Typography>
              <Typography>{cafe.street}</Typography>
              <Typography>
                {cafe.city}, {cafe.province}
              </Typography>
            </Grid>
            <div className={classNames(styles.cafeCardIcons)}>
              <div className={classNames(styles.busyness)}>
                {getBusynessIcon(cafe.busyness)}
                <label>{strings.cafeCard.busynessLabel}</label>
              </div>
              <div className={classNames(styles.noisiness)}>
                {getNoisinessIcon(cafe.noisiness)}
                <label>{strings.cafeCard.noisinessLabel}</label>
              </div>
              <div className={classNames(styles.priceIconGroup)}>
                {Array(cafe.price)
                  .fill("")
                  .map((x) => (
                    <AttachMoneyRoundedIcon
                      className={classNames(styles.priceIcon)}
                      key={x}
                    ></AttachMoneyRoundedIcon>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CafeCard;
