import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link /* useNavigate */ } from "react-router-dom";
import { loginQuery } from "../../support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/placeholder-logo.jpg";
import Button from "../../component/common/Button";
import classNames from "classnames";
import strings from "../../config/strings";
import styles from "./login.module.scss";
import "../../global.scss";

const Login = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
  });

  const [login] = useLazyQuery(loginQuery, {
    onError: (error) => {
      setLoginError(true), alert(error), console.log("Error in login");
    },
    onCompleted: (data) => {
      localStorage.setItem("authToken", data.login.token);
      setLoginError(false); // need to verify if error message is hidden if user exists in DB
      console.log("User authenticated, logging in ");
      navigate("/explore");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    setLoginInfo((loginInfo) => ({
      ...loginInfo,
      [name]: value,
    }));
  };

  const handleLogin = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    login({
      variables: {
        userName: loginInfo.username,
        password: loginInfo.password,
      },
    });
  };

  const validateLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMessage((loginInfo) => {
      const stateObj = { ...loginInfo, [name]: "" };
      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = strings.login.errorMessage.username;
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = strings.login.errorMessage.password;
          } else {
            stateObj["password"] = loginInfo.password
              ? ""
              : errorMessage.password;
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.header)}>
          <div className={classNames(styles.logo)}>
            <img src={Logo} alt={Logo} />
          </div>
          <h1>{strings.login.title}</h1>
          <p>{strings.login.description}</p>
        </div>
        <div className={classNames(styles.loginContainer)}>
          <div className={classNames(styles.login)}>
            <form className={classNames(styles.loginForm)} noValidate>
              <div className={classNames(styles.formItem)}>
                <input
                  type="text"
                  placeholder={strings.login.usernameLabel}
                  name="username"
                  required
                  onChange={handleChange}
                  onBlur={validateLoginInput}
                />
                <label>{strings.login.usernameLabel}</label>
                {errorMessage.username && <span>{errorMessage.username}</span>}
              </div>
              <div className={classNames(styles.formItem)}>
                <input
                  type="password"
                  placeholder={strings.login.passwordLabel}
                  name="password"
                  required
                  onChange={handleChange}
                  onBlur={validateLoginInput}
                />
                <label>{strings.login.passwordLabel}</label>
                {errorMessage.password && <span>{errorMessage.password}</span>}
              </div>
            </form>
            {loginError && (
              <span className={classNames(styles.errorMessage)}>
                {strings.login.errorMessage.invalid}
              </span>
            )}
            <Button
              type="secondary"
              buttonType="submit"
              className={styles.secondary}
              text={strings.login.button}
              onClick={handleLogin}
            />
            <p>
              {strings.login.text}
              <Link to="/signUp">{strings.login.link}</Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
