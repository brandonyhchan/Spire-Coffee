import React, { useState } from "react";
import { CafeData } from "../../pages/explore/mockCafeData";
import Logo from "assets/images/placeholder-logo.jpg";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import classNames from "classnames";
import styles from "./cafeCard.module.scss";
import strings from "config/strings";

type CafeCardPropsType = {
  query: string;
};

const CafeCard = ({ query }: CafeCardPropsType) => {
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
            <h5>{cafe.name}</h5>
            <p>{cafe.street}</p>
            <p>{cafe.city}</p>
            <div className={classNames(styles.cafeCardIcons)}>
              <div className={classNames(styles.busyness)}>
                <HourglassBottomRoundedIcon
                  className={classNames(styles.noisinessIcon)}
                ></HourglassBottomRoundedIcon>
                <label>{strings.cafeCard.busynessLabel}</label>
              </div>
              <div className={classNames(styles.noisiness)}>
                <VolumeUpRoundedIcon
                  className={classNames(styles.busynessIcon)}
                ></VolumeUpRoundedIcon>
                <label>{strings.cafeCard.noisinessLabel}</label>
              </div>
              <div className={classNames(styles.priceIconGroup)}>
                <AttachMoneyRoundedIcon
                  className={classNames(styles.priceIcon)}
                ></AttachMoneyRoundedIcon>
                <AttachMoneyRoundedIcon
                  className={classNames(styles.priceIcon)}
                ></AttachMoneyRoundedIcon>
                <AttachMoneyRoundedIcon
                  className={classNames(styles.priceIcon)}
                ></AttachMoneyRoundedIcon>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CafeCard;
