import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { getCafeInfo } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe } from "types/api/cafe";
import { Icons } from "component/common/Icons/Icons";
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

import Label from "component/common/Label";

import classNames from "classnames";
import styles from "./cafe.module.scss";
import strings from "config/strings";

const CafePage = () => {
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const token = localStorage.getItem("authToken");

  const [cafe, setCafe] = useState<Cafe>();

  const mapURL = `https://www.google.com/maps/embed/v1/place?key=${
    process.env.REACT_APP_GOOGLE_API_KEY
  }&q=${nameFormat(cafe?.name)}+${mapsAddress(cafe?.street, cafe?.city)}`;

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
      setCafe(data.getCafeInfo);
    },
    variables: {
      stringId: cafeId,
    },
  });

  function nameFormat(name: string | undefined) {
    return name?.replaceAll(" ", "+").replaceAll("&", "and");
  }

  function mapsAddress(address: string | undefined, city: string | undefined) {
    return `${address?.replaceAll(" ", "+")},${city}`;
  }

  function renderWebsite() {
    if (cafe?.website) {
      return (
        <div className={classNames(styles.websiteLink)}>
          <Label
            icon={Icons.globe}
            otherIcon={Icons.redirect}
            text={cafe?.website}
            anchorTag={true}
            link={`https://${cafe.website}`}
          />
        </div>
      );
    }
    return <Label icon={Icons.globe} text={strings.cafe.noWebsite} />;
  }

  return (
    <React.Fragment>
      <Helmet title={cafe?.name} />
      <Navbar />

      <div className={classNames(styles.container)}>
        {loading ? (
          <div className={classNames(styles.wrapper)}>
            <LoadingSpinner />
          </div>
        ) : (
          <React.Fragment>
            {cafe === null ? (
              <span>{strings.cafe.error}</span>
            ) : (
              <React.Fragment>
                <div className={classNames(styles.cafeTitle)}>
                  <h1>{cafe?.name}</h1>
                </div>
                <div className={classNames(styles.carouselContainer)}>
                  <ImageCarousel />
                </div>
                <div className={classNames(styles.infoContainer)}>
                  <div className={classNames(styles.cafeDetails)}>
                    <div className={classNames(styles.leftSection)}>
                      <Label text={cafe?.street} />
                      <Label
                        text={`${cafe?.city}, ${cafe?.province} ${cafe?.postalCode}`}
                      />
                      <div
                        className={classNames(styles.businessLabelContainer)}
                      >
                        <Label
                          icon={Icons.clock}
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
                        icon={Icons.phone}
                        text={cafe?.phoneNumber}
                        secondaryText={strings.cafe.noPhoneNumber}
                      />
                      {renderWebsite()}
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
                        text={`${
                          strings.cafe.noisinessLabel
                        }: ${renderNoiseText(cafe?.noisiness)}`}
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
                      src={mapURL}
                      allowFullScreen={true}
                    />
                  }
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};
export default CafePage;
