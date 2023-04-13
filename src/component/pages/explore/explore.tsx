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

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [filterSelected, setFilterSelected] = useState(false);
  const [searchCafeName, setSearchCafeName] = useState("");

  const updateFilterSelected = (filterSelected: boolean): void => {
    setFilterSelected(filterSelected);
  };

  const updateQuery = (newQuery: string): void => {
    setSearchCafeName(newQuery);
  };

  const [cafes, setCafes] = useState<Cafe[]>([]);

  // refetch could be added in case needed
  const { loading, error } = useQuery(cafeQuery, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafes(data?.returnAllCafes);
    },
    variables: { filterByName: searchCafeName },
  });

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
          {loading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          {!!cafes.length && (
            <div className={classNames(styles.exploreContainer)}>
              <div className={classNames(styles.filterContainer)}>
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
              <div className={classNames(styles.searchContainer)}>
                <div className={"searchBarContainer"}>
                  <SearchBar updateQuery={updateQuery} />
                </div>
                <div className={classNames(styles.cafeCardWrapper)}>
                  <div className={classNames(styles.cafeCardContainer)}>
                    {cafes.map((cafe: Cafe) => (
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
