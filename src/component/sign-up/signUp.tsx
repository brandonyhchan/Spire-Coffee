import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { signUpMutation } from "../../support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  validFirstName,
  validLastName,
  validPassword,
  validUsername,
  validEmail,
} from "./regexValidator";
import Button from "../common/Button";
import Input from "../common/Input";
import classNames from "classnames";
import strings from "../../config/strings";
import styles from "./signUp.module.scss";

const SignUp = () => {
  const navigate = useNavigate();

  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const [userInfo, setUserInfo] = useState({
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
  };

  const handleSignup = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setPasswordMatch(userInfo.password === userInfo.confPassword);
    if (usernameIsValid && passwordIsValid && passwordMatch) {
      signUp({
        variables: {
          userName: userInfo.username,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password,
        },
      });
    }
    console.log("User information submitted.");
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPasswordRequired(!value);
    setPasswordMatch(userInfo.password !== userInfo.confPassword);
  };

  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <h1 className={classNames(styles.heading)}>{strings.signUp.title}</h1>
      <div className={classNames(styles.signUpContainer)}>
        <div className={classNames(styles.signUp)}>
          <form className={classNames(styles.signUpForm)} noValidate>
            <div className={classNames(styles.formItem)}>
              <Input
                type="text"
                name="username"
                value={userInfo.username}
                placeholder={strings.signUp.usernameLabel}
                required
                onChange={handleChange}
                onBlur={() =>
                  setUsernameIsValid(!validUsername.test(userInfo.username))
                }
              />
              <label>{strings.signUp.usernameLabel}</label>
              {!usernameIsValid ? (
                <></>
              ) : (
                <span>
                  Username must be between 5-15 characters, only alphanumeric
                  and _ are allowed
                </span>
              )}
            </div>
            <div className={classNames(styles.formItem)}>
              <Input
                type="text"
                placeholder={strings.signUp.firstNameLabel}
                name="firstName"
                required
                onChange={handleChange}
                maxLength={40}
                onBlur={() =>
                  setFirstNameIsValid(!validFirstName.test(userInfo.firstName))
                }
              />
              <label>{strings.signUp.firstNameLabel}</label>
              {!firstNameIsValid ? (
                <></>
              ) : (
                <span>
                  First name is required and only alphabet characters are
                  allowed
                </span>
              )}
            </div>
            <div className={classNames(styles.formItem)}>
              <Input
                type="text"
                placeholder={strings.signUp.lastNameLabel}
                name="lastName"
                required
                onChange={handleChange}
                maxLength={40}
                onBlur={() =>
                  setLastNameIsValid(!validLastName.test(userInfo.lastName))
                }
              />
              <label>{strings.signUp.lastNameLabel}</label>
              {!lastNameIsValid ? (
                <></>
              ) : (
                <span>
                  Last name is required and only alphabet characters are allowed
                </span>
              )}
            </div>
            <div className={classNames(styles.formItem)}>
              <Input
                type="text"
                placeholder={strings.signUp.emailLabel}
                name="email"
                required
                onChange={handleChange}
                onBlur={() => setEmailIsValid(!validEmail.test(userInfo.email))}
              />
              <label>{strings.signUp.emailLabel}</label>
              {!emailIsValid ? (
                <></>
              ) : (
                <span>Please enter a valid email address</span>
              )}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.passwordLabel}
                name="password"
                required
                onChange={handleChange}
                onBlur={() =>
                  setPasswordIsValid(!validPassword.test(userInfo.password))
                }
              />
              <label>{strings.signUp.passwordLabel}</label>
              {!passwordIsValid ? (
                <></>
              ) : (
                <span>
                  Password must be 8-20 characters with 1 uppercase, 1 number, 1
                  special character
                </span>
              )}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.verifyPasswordLabel}
                required
                name="confPassword"
                onChange={handleChange}
                onBlur={handlePassword}
              />
              <label>{strings.signUp.verifyPasswordLabel}</label>
              {!passwordRequired ? (
                <></>
              ) : (
                <span>Please re-enter your password</span>
              )}
              {!passwordMatch ? <></> : <span>Passwords do not match</span>}
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
