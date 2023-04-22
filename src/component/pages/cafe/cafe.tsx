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

  console.log(cafe);

  return (
    <React.Fragment>
      <Helmet title={cafe?.name} />
      <Navbar />
      <div className={classNames(styles.container)}>
        {loading && (
          <div className={classNames(styles.wrapper)}>
            <LoadingSpinner className={classNames(styles.loadingSpinner)} />
          </div>
        )}
        {showCafeInfo ? (
          <div className={classNames(styles.cafeContainer)}>
            <h1 className={classNames(styles.cafeName)}>{cafe?.name}</h1>
            <div className={classNames(styles.cafeHeader)}>
              <div className={classNames(styles.cafeImages)}>
                <img src={Placeholder} alt={Placeholder} />
              </div>
            </div>
            <div className={classNames(styles.cafeAddress)}>
              <p>{cafe?.street}</p>
              <p>
                {cafe?.city}, {cafe?.province}
              </p>
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
