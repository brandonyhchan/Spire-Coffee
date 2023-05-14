import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import FormItem from "component/Form/FormItem";

import styles from "./account.module.scss";
import strings from "config/strings";

const Account = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleEditAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // need to add variables for account fields
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.account.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.title)}>
          <h2>{strings.account.title}</h2>
        </div>
        <div className={classNames(styles.accountContainer)}>
          <div className={classNames(styles.account)}>
            <form
              className={classNames(styles.accountForm)}
              noValidate
              onSubmit={handleEditAccount}
            >
              <FormItem
                className={styles.formItem}
                type={"text"}
                text={strings.login.usernameLabel}
                name={"username"}
                handleChange={handleChange}
              />
            </form>
          </div>
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default Account;
