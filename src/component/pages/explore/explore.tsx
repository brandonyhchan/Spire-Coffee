import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import Filter from "../../common/Filter/Filter";
import List from "../../common/List/List";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import classNames from "classnames";
import { CafeData } from "./mockCafeData";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "component/common/Button";

import styles from "./explore.module.scss";
import strings from "config/strings";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [query, setQuery] = useState("");
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [checked, setChecked] = useState("");

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setQuery("");
    setShowCloseButton(false);
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
              <Filter text={strings.explore.filterByDistance}>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.distance1}
                  value={strings.list.distance1}
                  checked={checked === strings.list.distance1}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.distance2}
                  value={strings.list.distance2}
                  checked={checked === strings.list.distance2}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.distance3}
                  value={strings.list.distance3}
                  checked={checked === strings.list.distance3}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.distance4}
                  value={strings.list.distance4}
                  checked={checked === strings.list.distance4}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
              </Filter>
              <Filter text={strings.explore.filterByBusyness}>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.busyness1}
                  value={strings.list.busyness1}
                  checked={checked === strings.list.busyness1}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.busyness2}
                  value={strings.list.busyness2}
                  checked={checked === strings.list.busyness2}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.busyness3}
                  value={strings.list.busyness3}
                  checked={checked === strings.list.busyness3}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
              </Filter>
              <Filter text={strings.explore.filterByNoiseLevel}>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.quietness1}
                  value={strings.list.quietness1}
                  checked={checked === strings.list.quietness1}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.quietness2}
                  value={strings.list.quietness2}
                  checked={checked === strings.list.quietness2}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.quietness3}
                  value={strings.list.quietness3}
                  checked={checked === strings.list.quietness3}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
              </Filter>
              <Filter text={strings.explore.filterByAmenities}>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.amenities1}
                  value={strings.list.amenities1}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.amenities2}
                  value={strings.list.amenities2}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.amenities3}
                  value={strings.list.amenities3}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.amenities4}
                  value={strings.list.amenities4}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.amenities5}
                  value={strings.list.amenities5}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
                <List
                  className={classNames(styles.listWrapper)}
                  text={strings.list.amenities6}
                  value={strings.list.amenities6}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setChecked(event.target.value)
                  }
                ></List>
              </Filter>
              <div className={classNames(styles.filterButtonWrapper)}>
                <Button text="Clear" type={"clear"}></Button>
                <Button text="Search" type={"search"}></Button>
              </div>
            </div>
            <div className={classNames(styles.searchBarContainer)}>
              <form className={classNames(styles.searchBar)}>
                <SearchRoundedIcon
                  className={classNames(styles.searchBarIcon)}
                ></SearchRoundedIcon>
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
                      // onClick={() => setQuery("")}
                      onClick={handleClick}
                    ></CloseRoundedIcon>
                  </div>
                )}
              </form>
              {CafeData.filter((cafe) => {
                if (query === "") {
                  return cafe;
                } else if (
                  cafe.name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return cafe;
                }
              }).map((cafe, index) => (
                <div key={index}>
                  <p>{cafe.name}</p>
                </div>
              ))}
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
