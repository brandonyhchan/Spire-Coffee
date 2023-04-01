import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import Filter from "./Filter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import classNames from "classnames";
import { CafeData } from "./mockCafeData";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import styles from "./explore.module.scss";
import strings from "config/strings";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [query, setQuery] = useState("");
  const [showCloseButton, setShowCloseButton] = useState(false);

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setQuery("");
    setShowCloseButton(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <React.Fragment>
      <Helmet title={strings.explore.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.explore)}>
          <div className={classNames(styles.exploreContainer)}>
            <div className={classNames(styles.filterContainer)}>
              <Filter text={strings.explore.filterByDistance}></Filter>
              <Filter text={strings.explore.filterByBusyness}></Filter>
              <Filter text={strings.explore.filterByNoiseLevel}></Filter>
            </div>
            <div className={classNames(styles.searchBarContainer)}>
              <form className={classNames(styles.searchBar)}>
                <SearchRoundedIcon
                  className={classNames(styles.searchBarIcon)}
                ></SearchRoundedIcon>
                <input
                  type="text"
                  placeholder="Search..."
                  name="search"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(event.target.value)
                  }
                  onFocus={() => setShowCloseButton(true)}
                  value={query}
                />
                {!showCloseButton ? null : (
                  <div className={classNames(styles.clearButtonContainer)}>
                    <CloseRoundedIcon
                      className={classNames(styles.clearButton)}
                      // onClick={() => setQuery("")}
                      onClick={handleClick}
                    ></CloseRoundedIcon>
                  </div>
                )}
              </form>
              {CafeData.filter((cafe) => {
                if (query === "") {
                  return cafe;
                } else if (
                  cafe.name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return cafe;
                }
              }).map((cafe, index) => (
                <div key={index}>
                  <p>{cafe.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default Explore;
