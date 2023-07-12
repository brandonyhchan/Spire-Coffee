import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { loginQuery } from "support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import Logo from "assets/images/placeholder-logo.jpg";
import Button from "component/common/Button";
import Form from "component/common/Form/Form";
import FormItem from "component/common/Form/FormItem";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./login.module.scss";
import "global.scss";

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
      localStorage.setItem("userId", data.login.user.id);
      localStorage.setItem("userName", data.login.user.userName);
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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginInfo.username !== "" && loginInfo.password !== "") {
      login({
        variables: {
          userName: loginInfo.username,
          password: loginInfo.password,
        },
      });
    } else {
      setLoginError(true);
    }
  };

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.code === "Enter") {
      login({
        variables: {
          userName: loginInfo.username,
          password: loginInfo.password,
        },
      });
    }
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

  function renderErrorMessage(errorMessage: string) {
    return errorMessage && <span>{errorMessage}</span>;
  }

  function renderButton() {
    return (
      <Button
        type="secondary"
        buttonType="submit"
        className={styles.secondary}
        text={strings.login.button}
      />
    );
  }

  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.header)}>
          <div className={classNames(styles.logo)}>
            <img src={Logo} alt={Logo} />
          </div>
          <h1>{strings.global.title}</h1>
          <p>{strings.login.description}</p>
        </div>
        <div className={classNames(styles.loginContainer)}>
          <div className={classNames(styles.login)}>
            <Form
              className={classNames(styles.loginForm)}
              handleForm={handleLogin}
              handleKeyEvent={handleKeyEvent}
              buttonGroup={renderButton()}
            >
              <FormItem
                type={"text"}
                placeholder={strings.global.label.username}
                text={strings.global.label.username}
                name={"username"}
                handleChange={handleChange}
                validateLoginInput={validateLoginInput}
                errorMessage={renderErrorMessage(errorMessage.username)}
              />
              <FormItem
                type={"password"}
                placeholder={strings.global.label.password}
                text={strings.global.label.password}
                name={"password"}
                handleChange={handleChange}
                validateLoginInput={validateLoginInput}
                errorMessage={renderErrorMessage(errorMessage.password)}
              />
            </Form>
            {loginError && (
              <span className={classNames(styles.errorMessage)}>
                {strings.login.errorMessage.invalid}
              </span>
            )}
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
