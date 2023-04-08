import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import classNames from "classnames";
import styles from "./SearchBar.module.scss";

type SearchBarPropsType = {
  query: string;
};

const SearchBar = ({ query }: SearchBarPropsType) => {
  const setQuery = (arg: string) => arg;
  const arg = "";

  const [showCloseButton, setShowCloseButton] = useState(false);
  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setQuery(arg);
    setShowCloseButton(false);
  };
  return (
    <React.Fragment>
      <form className={classNames(styles.searchBar)}>
        <SearchRoundedIcon className={classNames(styles.searchBarIcon)} />
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
              onClick={handleClick}
            />
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default SearchBar;
