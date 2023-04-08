import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { cafeQuery } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe } from "types/api/cafe";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import classNames from "classnames";
import Button from "component/common/Button";

import styles from "./explore.module.scss";
import strings from "config/strings";
import FilterByDistanceSlider from "./exploreFilters/filterByDistanceSlider";
import FilterByBusyness from "./exploreFilters/filterByBusyness";
import FilterByNoiseLevel from "./exploreFilters/filterByNoiseLevel";
import FilterByAmenities from "./exploreFilters/filterByAmenities";
import SearchBar from "component/common/SearchBar/searchBar";
import { Box, CircularProgress } from "@mui/material";
import CafeCard from "../../common/CafeCard/cafeCard";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const query = "";

  const [filterSelected, setFilterSelected] = useState(false);
  const updateFilterSelected = (filterSelected: boolean): void => {
    setFilterSelected(filterSelected);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [cafes, setCafes] = useState<Cafe[]>([]);

  const { loading, error, refetch } = useQuery(cafeQuery, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafes(data?.returnAllCafes);
    },
  });

  console.log(cafes);
  // console.log(cafes[4].profilePhotoURL);

  return (
    <React.Fragment>
      <Helmet title={strings.explore.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.explore)}>
          {loading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}

          <div className={classNames(styles.exploreContainer)}>
            <div className={classNames(styles.filterContainer)}>
              <FilterByDistanceSlider />
              <FilterByBusyness updateFilterSelected={updateFilterSelected} />
              <FilterByNoiseLevel updateFilterSelected={updateFilterSelected} />
              <FilterByAmenities updateFilterSelected={updateFilterSelected} />
              {filterSelected ? (
                <div className={classNames(styles.filterButtonWrapper)}>
                  <Button text="Clear" type={"clear"} />
                  <Button text="Search" type={"search"} />
                </div>
              ) : null}
            </div>
            <div className={classNames(styles.searchContainer)}>
              <SearchBar query={query} />
              <CafeCard query={query} />
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
