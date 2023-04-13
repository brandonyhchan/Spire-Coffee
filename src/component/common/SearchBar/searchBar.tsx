import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import classNames from "classnames";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  updateQuery: (arg: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ updateQuery }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [query, setQuery] = useState("");
  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setQuery("");
    setShowCloseButton(false);
  };
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    updateQuery(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={classNames(styles.searchBarContainer)}>
        <form className={classNames(styles.searchBar)}>
          <SearchRoundedIcon className={classNames(styles.searchBarIcon)} />
          <input
            type="text"
            placeholder="Search..."
            name="search"
            onChange={handleQuery}
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
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
