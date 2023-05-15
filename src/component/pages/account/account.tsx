import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import FormItem from "component/Form/FormItem";
import Button from "component/common/Button";
import Logo from "assets/images/placeholder-logo.jpg";

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
          <div className={classNames(styles.logo)}>
            <img src={Logo} alt={Logo} />
          </div>
          <div className={classNames(styles.account)}>
            <form
              noValidate
              onSubmit={handleEditAccount}
              className={classNames(styles.accountForm)}
            >
              <div className={classNames(styles.inputWrapper)}>
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={"wubdev"} // should be user's username
                  text={strings.global.usernameLabel}
                  name={"username"}
                  handleChange={handleChange}
                />
                <Button text={"EDIT"} buttonType={"submit"} type={"text"} />
              </div>
              <div className={classNames(styles.inputWrapper)}>
                <FormItem
                  className={styles.formItem}
                  type={"password"}
                  placeholder={"********"}
                  text={strings.global.passwordLabel}
                  name={"password"}
                  handleChange={handleChange}
                />
                <Button text={"EDIT"} buttonType={"submit"} type={"text"} />
              </div>
              <div className={classNames(styles.inputWrapper)}>
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={"spire_cawfee@gmail.com"}
                  text={strings.global.emailLabel}
                  name={"email"}
                  handleChange={handleChange}
                />
                <Button text={"EDIT"} buttonType={"submit"} type={"text"} />
              </div>
              <div className={classNames(styles.inputWrapper)}>
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={"Betty"}
                  text={strings.global.firstNameLabel}
                  name={"firstName"}
                  handleChange={handleChange}
                />
                <Button text={"EDIT"} buttonType={"submit"} type={"text"} />
              </div>
              <div className={classNames(styles.inputWrapper)}>
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={"Nugget"}
                  text={strings.global.lastNameLabel}
                  name={"lastName"}
                  handleChange={handleChange}
                />
                <Button text={"EDIT"} buttonType={"submit"} type={"text"} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Account;
