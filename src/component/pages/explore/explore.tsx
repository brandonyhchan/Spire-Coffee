import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import classNames from "classnames";
import { CafeData } from "./mockCafeData";

import styles from "./explore.module.scss";
import strings from "config/strings";

const Explore = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

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
          {/*Remove the title after*/}
          <p>{strings.explore.title}</p>
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
              />
            </form>
          </div>
          {CafeData.filter((post) => {
            if (query === "") {
              return post;
            } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
              return post;
            }
          }).map((post, index) => (
            <div className="box" key={index}>
              <p>{post.name}</p>
            </div>
          ))}
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default Explore;
