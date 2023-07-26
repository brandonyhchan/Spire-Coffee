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
import ImageCarousel from "./Carousel/ImageCarousel";
import Report from "./Report/Report";
import { businessHours } from "./cafeBusinessHours";

import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

import Label from "component/common/Label";

import classNames from "classnames";
import styles from "./cafe.module.scss";
import strings from "config/strings";

const CafePage = () => {
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const token = localStorage.getItem("authToken");

  const [cafe, setCafe] = useState<Cafe>();
  const [showCafeInfo, setShowCafeInfo] = useState<boolean>(false);

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

  function nameFormat(name: string | undefined) {
    return name?.replaceAll(" ", "+");
  }

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
                    <Label text={cafe?.street} />
                    <Label
                      text={`${cafe?.city}, ${cafe?.province} ${cafe?.postalCode}`}
                    />
                    <div className={classNames(styles.businessLabelContainer)}>
                      <Label
                        icon={<AccessTimeRoundedIcon />}
                        text={strings.cafe.businessHours}
                      />
                      <div>
                        {businessHours.map((hours, index) => (
                          <div
                            key={index}
                            className={classNames(
                              styles.businessHoursContainer
                            )}
                          >
                            <Label text={hours.weekday} />
                            <Label text={hours.hours} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Label
                      icon={<LocalPhoneRoundedIcon />}
                      text={cafe?.phoneNumber}
                      secondaryText={strings.cafe.noPhoneNumber}
                    />
                    <Label
                      icon={<LanguageRoundedIcon />}
                      text={renderWebsite()}
                    />
                  </div>
                  <div className={classNames(styles.rightSection)}>
                    <Label
                      icon={renderBusyIcon(cafe?.busyness)}
                      text={`${strings.cafe.busynessLabel}: ${renderBusyText(
                        cafe?.busyness
                      )}`}
                    />
                    <Label
                      icon={renderNoiseIcon(cafe?.noisiness)}
                      text={`${strings.cafe.noisinessLabel}: ${renderNoiseText(
                        cafe?.noisiness
                      )}`}
                    />
                    <Label
                      icon={renderPrice()}
                      text={`${strings.cafe.priceLabel}: ${renderPriceText(
                        cafe?.price
                      )}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames(styles.reportContainer)}>
              <Report cafe={cafe} />
            </div>
            <div className={classNames(styles.mapContainer)}>
              {
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  // eslint-disable-next-line max-len
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    process.env.REACT_APP_GOOGLE_API_KEY
                  }&q=${nameFormat(cafe?.name)}+${mapsAddress(
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
