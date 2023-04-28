import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { returnAllCafeQuery } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe, Location } from "types/api/cafe";

import classNames from "classnames";
import styles from "./explore.module.scss";
import strings from "config/strings";

import { SelectOptions } from "component/common/Filter/FilterType/RadioFilter";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";

import SearchBar from "component/common/SearchBar/searchBar";
import CafeCard from "component/common/CafeCard/cafeCard";
import FilterSideBar from "./FilterSideBar";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "component/common/Button";
import LoadingSpinner from "component/common/LoadingSpinner";
import Logo from "assets/images/placeholder-logo.jpg";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [showCloseButton, setShowCloseButton] = useState(false);
  const [showExplorePage, setShowExplorePage] = useState(false);

  const [mobileFilters, setMobileFilters] = useState<boolean>(false);
  const [searchCafeName, setSearchCafeName] = useState("");
  const [busynessLevel, setBusynessLevel] = useState<SelectOptions>();
  const [noiseLevel, setNoiseLevel] = useState<SelectOptions>();
  // const [sortOption, setSortOption] = useState(""); // need to decide what type of data sort options should be
  const [priceOptions, setPriceOptions] = useState<SelectOptions[]>([]);
  const [distance, setDistance] = useState(20);

  const [userLocation, setUserLocation] = useState<Location>();
  const [locationStatus, setLocationStatus] = useState("");

  const [cafes, setCafes] = useState<Cafe[]>([]);

  // refetch could be added in case needed
  const { loading, error, refetch } = useQuery(returnAllCafeQuery, {
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
      // sortFitler: sortOption,
      priceFilter: priceOptions,
      distanceFilter: distance,
      userLocation: userLocation,
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    getLocation();
  }, []);

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

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocationStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <React.Fragment>
      <Helmet title={strings.explore.helmet} />
      <NavBar />
      <div
        className={
          mobileFilters
            ? classNames(styles.container, styles.openMobileFilters)
            : classNames(styles.container)
        }
      >
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
              // sortState={sortOption}
              // setSortState={() => setSortOption}
              priceFilter={priceOptions}
              setPriceFilter={setPriceOptions}
              distanceFilter={distance}
              setDistanceFilter={setDistance}
              handleClick={() => refetch}
              showMobileFilters={null}
              mobileFiltersOpen={false}
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
              {!mobileFilters ? null : (
                <FilterSideBar
                  busynessState={busynessLevel}
                  setBusynessState={setBusynessLevel}
                  noiseState={noiseLevel}
                  setNoiseState={setNoiseLevel}
                  // sortState={sortOption}
                  // setSortState={() => setSortOption}
                  priceFilter={priceOptions}
                  setPriceFilter={setPriceOptions}
                  distanceFilter={distance}
                  setDistanceFilter={setDistance}
                  handleClick={() => refetch}
                  showMobileFilters={showMobileFilters}
                  mobileFiltersOpen={true}
                />
              )}
            </div>
          )}
          <div className={classNames(styles.searchResultContainer)}>
            {loading && <LoadingSpinner className={styles.LoadingSpinner} />}
            {error && (
              <div>
                <h2>{strings.explore.errorMessage}</h2>
              </div>
            )}
            {showExplorePage && (
              <div className={classNames(styles.searchWrapper)}>
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
                          to={`/cafes/${cafe.stringId}`}
                          key={cafe.id}
                          className={classNames(styles.link)}
                        >
                          <CafeCard
                            key={cafe.id}
                            {...cafe}
                            profilePhotoURL={cafe.profilePhotoURL || Logo}
                          />
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
