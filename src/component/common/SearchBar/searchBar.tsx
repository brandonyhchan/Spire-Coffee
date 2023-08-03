import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import classNames from "classnames";
import styles from "./SearchBar.module.scss";
import strings from "config/strings";

interface SearchBarProps {
  showCloseButton: boolean;
  query: string;
  handleClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  handleQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showCloseButton,
  query,
  handleClick,
  handleQuery,
}) => {
  return (
    <div className={classNames(styles.searchBarContainer)}>
      <form className={classNames(styles.searchBar)}>
        <SearchRoundedIcon className={classNames(styles.searchBarIcon)} />
        <input
          type="text"
          placeholder={strings.explore.searchBarText}
          name="search"
          onChange={handleQuery}
          onFocus={handleQuery}
          value={query}
        />
        {!showCloseButton || query.length <= 0 ? null : (
          <div className={classNames(styles.clearButtonContainer)}>
            <CloseRoundedIcon
              className={classNames(styles.clearButton)}
              onClick={handleClick}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
