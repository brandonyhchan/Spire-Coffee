import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { getCafeInfo } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe } from "types/api/cafe";
import {
  renderBusyIcon,
  renderNoiseIcon,
  renderPrice,
} from "component/common/Icons/Icons";

import Navbar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import LoadingSpinner from "component/common/LoadingSpinner";
import Dropdown from "component/common/Dropdown/Dropdown";
import ImageCarousel from "./Carousel/ImageCarousel";
import Map from "./Map/map";
import Report from "./Report/Report";

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
          <>
            <div className={classNames(styles.cafeTitle)}>
              <h1 className={classNames(styles.cafeName)}>{cafe?.name}</h1>
            </div>
            <div className={classNames(styles.cafeContainer)}>
              <div className={classNames(styles.infoSection)}>
                <ImageCarousel />
                <div className={classNames(styles.cafeInfoWrapper)}>
                  <h3>{strings.cafe.cafeInformation}</h3>
                  <div className={classNames(styles.cafeInfo)}>
                    <div className={classNames(styles.cafeDetails)}>
                      <p>{cafe?.street}</p>
                      <p>
                        {cafe?.city}
                        {strings.global.comma}
                        {strings.global.space}
                        {cafe?.province}
                        {strings.global.space}
                        {cafe?.postalCode}
                      </p>
                      <Dropdown text={"Hours of Operation"}>
                        <div className={classNames(styles.dropdown)}>
                          <div className={classNames(styles.cafeDays)}>
                            <p>Monday:</p>
                            <p>Tuesday:</p>
                            <p>Wednesday:</p>
                            <p>Thursday:</p>
                            <p>Friday:</p>
                            <p>Saturday:</p>
                            <p>Sunday:</p>
                          </div>
                          <div className={classNames(styles.cafeHours)}>
                            <p>8AM - 5PM</p>
                            <p>8AM - 5PM</p>
                            <p>8AM - 5PM</p>
                            <p>8AM - 5PM</p>
                            <p>10AM - 6PM</p>
                            <p>10AM - 4PM</p>
                            <p>11AM - 3PM</p>
                          </div>
                        </div>
                      </Dropdown>
                      <p>{cafe?.phoneNumber}</p>
                      {/* are we linking this to the external website */}
                      <p>{cafe?.website}</p>
                      {/* these might be turned into sliders after */}
                      <label className={classNames(styles.cafeBusynessLabel)}>
                        {strings.cafe.busynessLabel}
                        {renderBusyIcon(cafe?.busyness)}
                      </label>
                      <label className={classNames(styles.cafeNoisinessLabel)}>
                        {strings.cafe.noisinessLabel}
                        {renderNoiseIcon(cafe?.noisiness)}
                      </label>
                      <label className={classNames(styles.cafePriceLabel)}>
                        {strings.cafe.priceLabel}
                        {renderPrice(cafe?.price)}
                      </label>
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
                  <Report />
                </div>
              </div>
            </div>
            <Map />
          </>
        ) : null}
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};
export default CafePage;
