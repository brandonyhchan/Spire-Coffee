import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import classNames from "classnames";
import Button from "component/common/Button";

import styles from "./explore.module.scss";
import strings from "config/strings";
import FilterByDistanceSlider from "./filterComponent/filterByDistanceSlider";
import FilterByBusyness from "./filterComponent/filterByBusyness";
import FilterByNoiseLevel from "./filterComponent/filterByNoiseLevel";
import FilterByAmenities from "./filterComponent/filterByAmenities";
import SearchBar from "./searchBar";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [filterSelected, setFilterSelected] = useState(false);

  const updateFilterSelected = (filterSelected: boolean): void => {
    setFilterSelected(filterSelected);
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
              <FilterByDistanceSlider></FilterByDistanceSlider>
              <FilterByBusyness
                updateFilterSelected={updateFilterSelected}
              ></FilterByBusyness>
              <FilterByNoiseLevel
                updateFilterSelected={updateFilterSelected}
              ></FilterByNoiseLevel>
              <FilterByAmenities
                updateFilterSelected={updateFilterSelected}
              ></FilterByAmenities>
              {filterSelected ? (
                <div className={classNames(styles.filterButtonWrapper)}>
                  <Button text="Clear" type={"clear"}></Button>
                  <Button text="Search" type={"search"}></Button>
                </div>
              ) : null}
            </div>
            <div className={classNames(styles.searchContainer)}>
              <SearchBar></SearchBar>
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
