import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { cafeQuery } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe } from "types/api/cafe";
import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { SelectOptions } from "component/common/Filter/RadioFilter";

import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import MobileFilterComponent from "./exploreFilters/mobileFilterComponent";

import SearchBar from "component/common/SearchBar/searchBar";
import CafeCard from "component/common/CafeCard/cafeCard";
import FilterSideBar from "./FilterSideBar";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "component/common/Button";

import classNames from "classnames";
import styles from "./explore.module.scss";
import strings from "config/strings";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [showCloseButton, setShowCloseButton] = useState(false);
  const [showExplorePage, setShowExplorePage] = useState(false);

  const [mobileFilters, setMobileFilters] = useState<boolean>(false);
  const [searchCafeName, setSearchCafeName] = useState("");
  const [busynessLevel, setBusynessLevel] = useState<SelectOptions>();
  const [noiseLevel, setNoiseLevel] = useState<SelectOptions>();
  const [priceOptions, setPriceOptions] = useState<SelectOptions[]>([]);
  const [distance, setDistance] = useState(0);

  const [cafes, setCafes] = useState<Cafe[]>([]);

  // refetch could be added in case needed
  const { loading, error, refetch } = useQuery(cafeQuery, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafes(data?.returnAllCafes);
      setShowExplorePage(true);
    },
    variables: {
      filterByName: searchCafeName,
      busyFilter: busynessLevel,
      noiseFilter: noiseLevel,
      priceFilter: priceOptions,
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  function showMobileFilters(): void {
    setMobileFilters(!mobileFilters);
    console.log("clicked on mobile filter");
  }

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setSearchCafeName("");
    setShowCloseButton(false);
  };

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCafeName(event.target.value);
    setShowCloseButton(true);
  };

  const handleMoreResults = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // * TO DO: refetch
    console.log("More results clicked");
  };

  console.log(priceOptions);

  return (
    <React.Fragment>
      <Helmet title={strings.explore.helmet} />
      <NavBar />
      <div className={classNames(styles.container)}>
        {showExplorePage && (
          <div className={classNames(styles.filterContainer)}>
            <div>
              <h2 className={classNames(styles.filterTitle)}>
                {strings.explore.filter.filterTitle}
              </h2>
            </div>
            <FilterSideBar
              busynessState={busynessLevel}
              setBusynessState={setBusynessLevel}
              noiseState={noiseLevel}
              setNoiseState={setNoiseLevel}
              priceFilter={priceOptions}
              setPriceFilter={setPriceOptions}
              distanceFilter={distance}
              setDistanceFilter={setDistance}
              handleClick={() => refetch}
            />
          </div>
        )}
        <div className={classNames(styles.searchContainer)}>
          {showExplorePage && (
            <div className={classNames(styles.searchBarContainer)}>
              <SearchBar
                showCloseButton={showCloseButton}
                query={searchCafeName}
                handleClick={handleClick}
                handleQuery={handleSearchQuery}
              />
              <div className={classNames(styles.mobileFilter)}>
                <TuneIcon
                  className={classNames(styles.filterIcon)}
                  onClick={showMobileFilters}
                />
              </div>
            </div>
          )}
          <div className={classNames(styles.searchResultContainer)}>
            {loading && (
              <Box className={classNames(styles.loadingSpinnerContainer)}>
                <ThemeProvider theme={theme}>
                  <CircularProgress color={"primary"} size={"80px"} />
                </ThemeProvider>
              </Box>
            )}
            {error && (
              <div>
                <h2>{strings.explore.errorMessage}</h2>
              </div>
            )}
            {showExplorePage && (
              <div className={classNames(styles.searchWrapper)}>
                {!mobileFilters ? null : <MobileFilterComponent />}
                <div className={classNames(styles.cafeCardWrapper)}>
                  {cafes.length === 0 ? (
                    <span className={classNames(styles.noResultsMessage)}>
                      {strings.explore.noResultsMessage}
                      <Link to="/addCafe">{strings.explore.addCafe}</Link>
                    </span>
                  ) : (
                    <div className={classNames(styles.cafeCardContainer)}>
                      {cafes.map((cafe: Cafe) => (
                        <Link
                          reloadDocument
                          to={`/cafes/${cafe.profilePhotoName}`}
                          key={cafe.id}
                        >
                          <CafeCard key={cafe.id} {...cafe} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {cafes.length === 0 ? null : (
                  <div className={classNames(styles.seeMoreButtonWrapper)}>
                    <Button
                      buttonType="submit"
                      type="primary"
                      text={strings.explore.seeMoreResults}
                      onClick={handleMoreResults}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Explore;
