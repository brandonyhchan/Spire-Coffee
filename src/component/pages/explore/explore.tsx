import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { cafeQuery } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe } from "types/api/cafe";
import { Box, CircularProgress } from "@mui/material";

import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import MobileFilterComponent from "./exploreFilters/mobileFilterComponent";

import SearchBar from "component/common/SearchBar/searchBar";
import CafeCard from "component/common/CafeCard/cafeCard";
import FilterSideBar from "./FilterSideBar";

import TuneIcon from "@mui/icons-material/Tune";
import { SelectOptions } from "component/common/Filter/RadioFilter";

import classNames from "classnames";
import styles from "./explore.module.scss";
import strings from "config/strings";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [searchCafeName, setSearchCafeName] = useState("");
  const [query, setQuery] = useState("");
  const [showCloseButton, setShowCloseButton] = useState(false);

  const [mobileFilters, setMobileFilters] = useState<boolean>(false);
  const [busynessLevel, setBusynessLevel] = useState<SelectOptions>();
  const [noiseLevel, setNoiseLevel] = useState<SelectOptions>();
  const [priceOptions, setPriceOptions] = useState<SelectOptions[]>([]);

  const [cafes, setCafes] = useState<Cafe[]>([]);

  // refetch could be added in case needed
  const { loading, error, refetch } = useQuery(cafeQuery, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafes(data?.returnAllCafes);
    },
    variables: {
      filterByName: searchCafeName,
      busyFilter: busynessLevel,
      noiseFilter: noiseLevel,
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  //What type should this be? //should be void because it doesnt return anything
  function showMobileFilters(): void {
    setMobileFilters(!mobileFilters);
    console.log("clicked on mobile filter");
  }

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setQuery("");
    setShowCloseButton(false);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchCafeName(event.target.value);
    setShowCloseButton(true);
    console.log(query);
  };

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
                <FilterSideBar
                  busynessState={busynessLevel}
                  setBusynessState={setBusynessLevel}
                  noiseState={noiseLevel}
                  setNoiseState={setNoiseLevel}
                  priceFilter={priceOptions}
                  setPriceFilter={setPriceOptions}
                  handleClick={() => refetch}
                />
              </div>
              {/* Search bar and cards start here*/}
              <div className={classNames(styles.exploreSectionContainer)}>
                <div className={classNames(styles.searchBarContainer)}>
                  <SearchBar
                    showCloseButton={showCloseButton}
                    query={query}
                    handleClick={handleClick}
                    handleQuery={handleQuery}
                  />
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
