import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import Report from "./Report/Report";
import { businessHours } from "./cafeBusinessHours";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

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

  const handleFavouriteButton = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFavourite(!favourite); // on refresh favourite is false, this bug needs to be fixed
  };

  function mapsAddress(address: string | undefined, city: string | undefined) {
    return `${address?.replaceAll(" ", "+")},${city}`;
  }

  function renderWebsite() {
    if (cafe?.website) {
      return (
        //TODO: replace with tag from react-router
        <a
          href={`https://${cafe?.website}`}
          target="_blank"
          rel="noreferrer"
          className={classNames(styles.websiteLink)}
        >
          {cafe?.website}
          <div className={classNames(styles.redirectIcon)}>
            <LaunchRoundedIcon />
          </div>
        </a>
      );
    }
    return <label>{strings.cafe.noWebsite}</label>;
  }

  return (
    <React.Fragment>
      <Helmet title={cafe?.name} />
      <Navbar />
      {loading && (
        <div className={classNames(styles.wrapper)}>
          <LoadingSpinner />
        </div>
      )}
      <div className={classNames(styles.container)}>
        {showCafeInfo ? (
          <React.Fragment>
            <div className={classNames(styles.cafeTitle)}>
              <h1 className={classNames(styles.cafeName)}>{cafe?.name}</h1>
            </div>
            <div className={classNames(styles.carouselContainer)}>
              <ImageCarousel />
            </div>
            <div className={classNames(styles.infoContainer)}>
              <div className={classNames(styles.cafeInfo)}>
                <div className={classNames(styles.cafeDetails)}>
                  <div className={classNames(styles.leftSection)}>
                    <div className={classNames(styles.cafeAddress)}>
                      <p>{cafe?.street}</p>
                      <p>
                        {`${cafe?.city}, ${cafe?.province}`}
                        {` ${cafe?.postalCode}`}
                      </p>
                    </div>
                    <div className={classNames(styles.labelContainer)}>
                      <AccessTimeRoundedIcon />
                      <label>
                        <Dropdown text={strings.cafe.businessHours}>
                          {businessHours.map((hours, index) => (
                            <div
                              key={index}
                              className={classNames(styles.dropdownItem)}
                            >
                              <div className={classNames(styles.cafeDays)}>
                                <p>{hours.weekday}</p>
                              </div>
                              <div className={classNames(styles.cafeHours)}>
                                <p>{hours.hours}</p>
                              </div>
                            </div>
                          ))}
                        </Dropdown>
                      </label>
                    </div>
                    <div className={classNames(styles.labelContainer)}>
                      <LocalPhoneRoundedIcon />
                      <label>
                        {cafe?.phoneNumber !== null
                          ? cafe?.phoneNumber
                          : strings.cafe.noPhoneNumber}
                      </label>
                    </div>
                    <div className={classNames(styles.labelContainer)}>
                      <LanguageRoundedIcon />
                      {renderWebsite()}
                    </div>
                  </div>
                  <div className={classNames(styles.rightSection)}>
                    <div className={classNames(styles.labelContainer)}>
                      {renderBusyIcon(cafe?.busyness)}
                      <label>
                        {`${strings.cafe.busynessLabel}: ${renderBusyText(
                          cafe?.busyness
                        )}`}
                      </label>
                    </div>
                    <div className={classNames(styles.labelContainer)}>
                      {renderNoiseIcon(cafe?.noisiness)}
                      <label>
                        {`${strings.cafe.noisinessLabel}: ${renderNoiseText(
                          cafe?.noisiness
                        )}`}
                      </label>
                    </div>
                    <div className={classNames(styles.labelContainer)}>
                      {renderPrice()}
                      <label>
                        {`${strings.cafe.priceLabel}: ${renderPriceText(
                          cafe?.price
                        )}`}
                      </label>
                    </div>
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
            </div>
            <div className={classNames(styles.reportContainer)}>
              <Report cafe={cafe} />
            </div>
            <div className={classNames(styles.mapContainer)}>
              {
                <iframe
                  width="750" // not sure how to get these numbers dynamic
                  height="500"
                  frameBorder="0"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  // eslint-disable-next-line max-len
                  src={`https://www.google.com/maps/embed/v1/place?key=${"AIzaSyB08r9Cbzm8V3slwoEp_zlvpx-oapg6sKo"}&q=${mapsAddress(
                    cafe?.street,
                    cafe?.city
                  )}`}
                  allowFullScreen={true}
                />
              }
            </div>
          </React.Fragment>
        ) : null}
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};
export default CafePage;
