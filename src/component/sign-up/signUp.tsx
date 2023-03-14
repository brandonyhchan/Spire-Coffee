import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { signUpMutation } from "../../support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import classNames from "classnames";
import strings from "../../config/strings";
import styles from "./signUp.module.scss";

const SignUp = () => {
  const navigate = useNavigate();

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const [signUp] = useLazyQuery(signUpMutation, {
    onError: (error) => {
      setSignUpError(true);
      alert(error);
      console.log("Error in signup"); // change this to require config/strings.ts later
    },
    onCompleted: (data) => {
      localStorage.setItem("authToken", data.signup.token);
      alert("Successfully signed up");
      // navigate("/") navigate to another page here
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    validateUserInfo(event);
  };

  const handleSignup = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    if (passwordMatch) {
      signUp({
        variables: {
          userName: userInfo.username,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password,
        },
      });
      console.log("User information submitted.");
    }
  };

  const validateUserInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMessage((userInfo) => {
      const stateObj = { ...userInfo, [name]: "" };
      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Username is required.";
          }
          break;
        case "firstName":
          if (!value) {
            stateObj[name] = "First name is required.";
          }
          break;
        case "lastName":
          if (!value) {
            stateObj[name] = "Last name is required.";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Email address is required.";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Password is required.";
          }
          break;
        case "confPassword":
          if (!value) {
            stateObj[name] = "Please re-enter your password.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  React.useEffect(() => {
    setPasswordMatch(
      !!userInfo.password && userInfo.password !== userInfo.confPassword
    );
  }, [userInfo.password, userInfo.confPassword]);

  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <h1 className={classNames(styles.heading)}>{strings.signUp.title}</h1>
      <div className={classNames(styles.signUpContainer)}>
        <div className={classNames(styles.signUp)}>
          <form className={classNames(styles.signUpForm)} noValidate>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                name="username"
                value={userInfo.username}
                placeholder={strings.signUp.usernameLabel}
                required
                onChange={handleChange}
                onBlur={validateUserInfo}
              />
              <label>{strings.signUp.usernameLabel}</label>
              {errorMessage.username && <span>{errorMessage.username}</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.firstNameLabel}
                name="firstName"
                required
                onChange={handleChange}
                onBlur={validateUserInfo}
              />
              <label>{strings.signUp.firstNameLabel}</label>
              {errorMessage.firstName && <span>{errorMessage.firstName}</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.lastNameLabel}
                name="lastName"
                required
                onChange={handleChange}
                onBlur={validateUserInfo}
              />
              <label>{strings.signUp.lastNameLabel}</label>
              {errorMessage.lastName && <span>{errorMessage.lastName}</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.emailLabel}
                name="email"
                required
                onChange={handleChange}
                onBlur={validateUserInfo}
              />
              <label>{strings.signUp.emailLabel}</label>
              {errorMessage.email && <span>{errorMessage.email}</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.passwordLabel}
                name="password"
                required
                onChange={handleChange}
                onBlur={validateUserInfo}
              />
              <label>{strings.signUp.passwordLabel}</label>
              {errorMessage.password && <span>{errorMessage.password}</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.verifyPasswordLabel}
                required
                name="confPassword"
                onChange={handleChange}
                onBlur={validateUserInfo}
              />
              <label>{strings.signUp.verifyPasswordLabel}</label>
              {errorMessage.confPassword && (
                <span>{errorMessage.confPassword}</span>
              )}
              {passwordMatch && <span>Passwords do not match.</span>}
            </div>
            <Button
              buttonType="submit"
              className="signUpButton"
              text={strings.signUp.buttonText}
              onClick={handleSignup}
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
