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
import FilterByPrice from "./exploreFilters/filterByPrice";
import FilterByDistanceSlider from "./exploreFilters/filterByDistanceSlider";
import FilterByBusyness from "./exploreFilters/filterByBusyness";
import FilterByNoiseLevel from "./exploreFilters/filterByNoiseLevel";
import FilterByAmenities from "./exploreFilters/filterByAmenities";
import SearchBar from "component/common/SearchBar/searchBar";
import { Box, CircularProgress } from "@mui/material";
import CafeCard from "component/common/CafeCard/cafeCard";
import MobileFilterComponent from "./exploreFilters/mobileFilterComponent";

import TuneIcon from "@mui/icons-material/Tune";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [filterSelected, setFilterSelected] = useState(false);
  const [newQuery, setNewQuery] = useState("");

  const updateFilterSelected = (filterSelected: boolean): void => {
    setFilterSelected(filterSelected);
  };

  const updateQuery = (newQuery: string): void => {
    setNewQuery(newQuery);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [cafes, setCafes] = useState<Cafe[]>([]);

  // refetch could be added in case needed
  const { loading, error } = useQuery(cafeQuery, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafes(data?.returnAllCafes);
    },
  });

  console.log(cafes);

  const [mobileFilters, setMobileFilters] = useState<boolean>(false);

  //What type should this be?
  function showMobileFilters(): any {
    setMobileFilters(!mobileFilters);
    console.log("clicked on mobile filter");
  }

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
          {!!cafes.length && (
            <div className={classNames(styles.exploreContainer)}>
              <div className={classNames(styles.filterContainer)}>
                <div>
                  <h2 className={classNames(styles.filterTitle)}>
                    {strings.explore.filterTitle}
                  </h2>
                </div>
                <FilterByDistanceSlider />
                <FilterByBusyness updateFilterSelected={updateFilterSelected} />
                <FilterByNoiseLevel
                  updateFilterSelected={updateFilterSelected}
                />
                <FilterByPrice updateFilterSelected={updateFilterSelected} />
                <FilterByAmenities
                  updateFilterSelected={updateFilterSelected}
                />
                {filterSelected ? (
                  <div className={classNames(styles.filterButtonWrapper)}>
                    <Button text="Clear" type={"clear"} />
                    <Button text="Filter" type={"filter"} />
                  </div>
                ) : null}
              </div>
              {/* 
              
              Search bar and cards start here

              */}
              <div className={classNames(styles.exploreSectionContainer)}>
                <div className={classNames(styles.searchBarContainer)}>
                  <SearchBar updateQuery={updateQuery} />
                  <div className={classNames(styles.mobileFilter)}>
                    <TuneIcon
                      className={classNames(styles.filterIcon)}
                      onClick={showMobileFilters}
                    />
                  </div>
                </div>
                {!mobileFilters ? null : <MobileFilterComponent />}
                <div className={classNames(styles.cafeCardWrapper)}>
                  <div className={classNames(styles.cafeCardContainer)}>
                    {cafes.map((cafe: Cafe, index) => (
                      <CafeCard key={cafe.id} {...cafe} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default Explore;
