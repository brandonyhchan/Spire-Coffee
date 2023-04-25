import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { getCafeInfo } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe } from "types/api/cafe";

import Navbar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import LoadingSpinner from "component/common/LoadingSpinner";
import Placeholder from "assets/images/placeholder.jpg";

import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HourglassFullRoundedIcon from "@mui/icons-material/HourglassFullRounded";

import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import classNames from "classnames";
import styles from "./cafe.module.scss";
import strings from "config/strings";

const CafePage = () => {
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const token = localStorage.getItem("authToken");

  const [cafe, setCafe] = useState<Cafe>();
  const [showCafeInfo, setShowCafeInfo] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const { loading, error, refetch } = useQuery(getCafeInfo, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafe(data?.getCafeInfo);
      setShowCafeInfo(true);
    },
    variables: {
      stringId: cafeId,
    },
  });

  console.log(cafe);

  const handleFavouriteButton = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFavourite(!favourite); // on refresh favourite is false, this bug needs to be fixed
  };

  function renderBusynessLevel() {
    if (cafe?.busyness === "LOW") {
      return (
        <HourglassEmptyRoundedIcon
          className={classNames(styles.busynessIcon)}
        />
      );
    } else if (cafe?.busyness === "MEDIUM") {
      return (
        <HourglassBottomRoundedIcon
          className={classNames(styles.busynessIcon)}
        />
      );
    } else if (cafe?.busyness === "HIGH") {
      return (
        <HourglassFullRoundedIcon className={classNames(styles.busynessIcon)} />
      );
    }
  }

  function renderNoisinessLevel() {
    if (cafe?.noisiness === "LOW") {
      return (
        <VolumeMuteRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else if (cafe?.noisiness === "MEDIUM") {
      return (
        <VolumeDownRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    } else if (cafe?.noisiness === "HIGH") {
      return (
        <VolumeUpRoundedIcon className={classNames(styles.noisinessIcon)} />
      );
    }
  }

  function renderPrice() {
    if (cafe?.price === "LOW") {
      return (
        <div className={classNames(styles.priceIconGroup)}>
          <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
        </div>
      );
    } else if (cafe?.price === "MEDIUM") {
      return (
        <div className={classNames(styles.priceIconGroup)}>
          <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
          <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
        </div>
      );
    } else if (cafe?.price === "HIGH") {
      return (
        <div className={classNames(styles.priceIconGroup)}>
          <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
          <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
          <AttachMoneyRoundedIcon className={classNames(styles.priceIcon)} />
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <Helmet title={cafe?.name} />
      <Navbar />
      <div className={classNames(styles.container)}>
        {loading && (
          <div className={classNames(styles.wrapper)}>
            <LoadingSpinner />
          </div>
        )}
        {showCafeInfo ? (
          <div className={classNames(styles.cafeContainer)}>
            <div className={classNames(styles.cafeHeader)}>
              <div className={classNames(styles.cafeTitle)}>
                <img src={cafe?.profilePhotoURL} alt={cafe?.profilePhotoURL} />
                <h1 className={classNames(styles.cafeName)}>{cafe?.name}</h1>
                {/* {renderPrice()} */}
              </div>
              <div
                onClick={handleFavouriteButton}
                className={classNames(styles.favouriteButton)}
              >
                {!favourite ? (
                  <FavoriteBorderRoundedIcon />
                ) : (
                  <FavoriteRoundedIcon />
                )}
              </div>
            </div>
            <div className={classNames(styles.carouselContainer)}>
              <div className={classNames(styles.cafeImages)}>
                <img src={Placeholder} alt={Placeholder} />
              </div>
            </div>
            <div className={classNames(styles.cafeInfoContainer)}>
              {/* put into strings */}
              <h3>Cafe Information</h3>
              <div className={classNames(styles.cafeInfo)}>
                <div className={classNames(styles.cafeAddress)}>
                  <p>{cafe?.street}</p>
                  <p>
                    {cafe?.city}
                    {strings.global.comma}
                    {strings.global.space}
                    {cafe?.province}
                    {/* insert postal code? */}
                  </p>
                  <div className={classNames(styles.cafeStatus)}>
                    <label className={classNames(styles.cafeBusynessLabel)}>
                      {strings.cafe.busynessLabel}
                      {renderBusynessLevel()}
                    </label>
                    <label className={classNames(styles.cafeNoisinessLabel)}>
                      {strings.cafe.noisinessLabel}
                      {renderNoisinessLevel()}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};
export default CafePage;
