import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./signUp.module.scss";
import { useLazyQuery } from "@apollo/client";
import { signUpMutation } from "../../support/graphqlServerApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    userName: "",
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
    if (passwordMatch) {
      signUp({
        variables: {
          userName: userInfo.userName,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password,
        },
      });
      console.log("User information submitted.");
    }
  };

  React.useEffect(() => {
    setIsValidUserName(!!userInfo.userName && userInfo.userName !== "");
    setIsValidFirstName(!!userInfo.firstName && userInfo.firstName !== "");
    setIsValidLastName(!!userInfo.lastName && userInfo.lastName !== "");
    setIsValidEmail(!!userInfo.email && userInfo.email !== "");
    setIsValidPassword(!!userInfo.password && userInfo.password !== "");
    setPasswordMatch(
      !!userInfo.password && userInfo.password === userInfo.confPassword
    );
  }, [userInfo]);

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
                name="userName"
                value={userInfo.userName}
                placeholder={strings.signUp.usernameLabel}
                required
                onChange={handleChange}
              />
              <label>{strings.signUp.usernameLabel}</label>
              {isValidUserName ? null : <span>Username is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.firstNameLabel}
                name="firstName"
                required
                onChange={handleChange}
              />
              <label>{strings.signUp.firstNameLabel}</label>
              {isValidFirstName ? null : <span>First name is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.lastNameLabel}
                name="lastName"
                required
                onChange={handleChange}
              />
              <label>{strings.signUp.lastNameLabel}</label>
              {isValidLastName ? null : <span>Last name is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.emailLabel}
                name="email"
                required
                onChange={handleChange}
              />
              <label>{strings.signUp.emailLabel}</label>
              {isValidEmail ? null : <span>Email address is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.passwordLabel}
                name="password"
                required
                onChange={handleChange}
              />
              <label>{strings.signUp.passwordLabel}</label>
              {isValidPassword ? null : <span>Password is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.verifyPasswordLabel}
                required
                name="confPassword"
                onChange={handleChange}
              />
              <label>{strings.signUp.verifyPasswordLabel}</label>
              {passwordMatch ? null : <span>Passwords do not match.</span>}
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
