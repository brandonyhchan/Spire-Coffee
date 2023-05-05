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
  renderBusyText,
  renderNoiseText,
  renderPriceText,
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
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

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

  function renderLabel() {
    if (cafe?.website) {
      return cafe?.website;
    }
    return strings.cafe.noWebsite;
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
          <>
            <div className={classNames(styles.cafeTitle)}>
              <h1 className={classNames(styles.cafeName)}>{cafe?.name}</h1>
            </div>
            <div className={classNames(styles.cafeContainer)}>
              <div className={classNames(styles.infoSection)}>
                <div className={classNames(styles.imageContainer)}>
                  <ImageCarousel />
                </div>
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
                      <div className={classNames(styles.labelContainer)}>
                        <AccessTimeRoundedIcon />
                        <label>
                          <Dropdown text={strings.cafe.businessHours}>
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
                        </label>
                      </div>
                      <div className={classNames(styles.labelContainer)}>
                        {<LocalPhoneRoundedIcon />}
                        <label>{cafe?.phoneNumber}</label>
                      </div>
                      {/* are we linking this to the external website */}
                      <div className={classNames(styles.labelContainer)}>
                        <LanguageRoundedIcon />
                        <label>{renderLabel()}</label>
                      </div>
                      {/* these might be turned into sliders after */}
                      <div className={classNames(styles.labelContainer)}>
                        {renderBusyIcon(cafe?.busyness)}
                        <label>
                          {strings.cafe.busynessLabel}
                          {strings.global.semiColon}
                          {strings.global.space}
                          {renderBusyText(cafe?.busyness)}
                        </label>
                      </div>
                      <div className={classNames(styles.labelContainer)}>
                        {renderNoiseIcon(cafe?.noisiness)}
                        <label>
                          {strings.cafe.noisinessLabel}
                          {strings.global.semiColon}
                          {strings.global.space}
                          {renderNoiseText(cafe?.noisiness)}
                        </label>
                      </div>
                      <div className={classNames(styles.labelContainer)}>
                        {renderPrice(cafe?.price)}
                        <label>
                          {strings.cafe.priceLabel}
                          {strings.global.semiColon}
                          {strings.global.space}
                          {renderPriceText(cafe?.price)}
                        </label>
                      </div>
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
