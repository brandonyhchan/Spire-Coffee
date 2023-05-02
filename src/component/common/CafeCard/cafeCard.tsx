import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  renderBusyIcon,
  renderNoiseIcon,
  renderPrice,
} from "component/common/Icons/Icons";
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
  const mobileSize = useMediaQuery("(min-width) and (max-width:600px)");
  const xsMobileSize = useMediaQuery("(max-width:299px)");

  function checkSize() {
    if (xsMobileSize) {
      return 14;
    } else {
      return 20;
    }
  }

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
            fontSize={mobileSize ? 15 : checkSize}
            fontWeight={"600"}
          >
            {name}
          </Typography>
          <Typography
            fontSize={mobileSize ? 15 : checkSize}
            fontFamily={"Figtree-Regular"}
          >
            {street}
          </Typography>
          <Typography
            fontSize={mobileSize ? 15 : checkSize}
            fontFamily={"Figtree-Regular"}
          >
            {city}, {province}
          </Typography>
        </Grid>
        <div className={classNames(styles.cafeCardIcons)}>
          <div className={classNames(styles.busyness)}>
            {renderBusyIcon(busyness)}
            <label>{strings.cafe.busynessLabel}</label>
          </div>
          <div className={classNames(styles.noisiness)}>
            {renderNoiseIcon(noisiness)}
            <label>{strings.cafe.noisinessLabel}</label>
          </div>
          <div className={classNames(styles.priceIconGroup)}>
            {renderPrice(price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;
