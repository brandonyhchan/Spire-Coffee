import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { signUpMutation } from "support/graphqlServerApi";
import RegexValidator from "./regexValidator";
import Button from "component/common/Button";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import classNames from "classnames";
import strings from "config/strings";
import styles from "./signUp.module.scss";

const SignUp = () => {
  const regexValidator: RegexValidator = new RegexValidator();
  const navigate = useNavigate();

  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [signUpError, setSignUpError] = useState(false); // please fill in all fields
  const [signUpErrorMessage, setSignUpErrorMessage] = useState(false); // please fill in all fields

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
      localStorage.setItem("authToken", data.signUp.token);
      setSignUpError(false);
      alert("Successfully signed up");
      navigate("/explore");
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

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signUpError === false) {
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
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPasswordRequired(!value);
    setPasswordMatch(userInfo.password !== userInfo.confPassword);
  };

  const checkForm = () => {
    if (
      userInfo.username === "" ||
      userInfo.firstName === "" ||
      userInfo.lastName === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.confPassword === "" ||
      passwordMatch === true
    ) {
      setSignUpError(true);
      setSignUpErrorMessage(true);
    } else {
      setSignUpError(false);
      setSignUpErrorMessage(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.signUpContainer)}>
          <h3 className={classNames(styles.heading)}>{strings.signUp.title}</h3>
          <div className={classNames(styles.signUp)}>
            <form
              className={classNames(styles.signUpForm)}
              noValidate
              onSubmit={handleSignUp}
            >
              <div className={classNames(styles.formItem)}>
                <input
                  type="text"
                  name="username"
                  value={userInfo.username}
                  placeholder={strings.signUp.usernameLabel}
                  required
                  onChange={handleChange}
                  onBlur={() =>
                    setUsernameIsValid(
                      !regexValidator.validUsername.test(userInfo.username)
                    )
                  }
                />
                <label>{strings.signUp.usernameLabel}</label>
                {!usernameIsValid ? null : (
                  <span>{strings.signUp.error.username}</span>
                )}
              </div>
              <div className={classNames(styles.formItem)}>
                <input
                  type="text"
                  placeholder={strings.signUp.firstNameLabel}
                  name="firstName"
                  required
                  onChange={handleChange}
                  maxLength={40}
                  onBlur={() =>
                    setFirstNameIsValid(
                      !regexValidator.validFirstName.test(userInfo.firstName)
                    )
                  }
                />
                <label>{strings.signUp.firstNameLabel}</label>
                {!firstNameIsValid ? null : (
                  <span>{strings.signUp.error.firstName}</span>
                )}
              </div>
              <div className={classNames(styles.formItem)}>
                <input
                  type="text"
                  placeholder={strings.signUp.lastNameLabel}
                  name="lastName"
                  required
                  onChange={handleChange}
                  maxLength={40}
                  onBlur={() =>
                    setLastNameIsValid(
                      !regexValidator.validLastName.test(userInfo.lastName)
                    )
                  }
                />
                <label>{strings.signUp.lastNameLabel}</label>
                {!lastNameIsValid ? null : (
                  <span>{strings.signUp.error.lastName}</span>
                )}
              </div>
              <div className={classNames(styles.formItem)}>
                <input
                  type="text"
                  placeholder={strings.signUp.emailLabel}
                  name="email"
                  required
                  onChange={handleChange}
                  onBlur={() =>
                    setEmailIsValid(
                      !regexValidator.validEmail.test(userInfo.email)
                    )
                  }
                />
                <label>{strings.signUp.emailLabel}</label>
                {!emailIsValid ? null : (
                  <span>{strings.signUp.error.email}</span>
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
                    setPasswordIsValid(
                      !regexValidator.validPassword.test(userInfo.password)
                    )
                  }
                />
                <label>{strings.signUp.passwordLabel}</label>
                {!passwordIsValid ? null : (
                  <>
                    <span>{strings.signUp.error.password}</span>
                    <span>{strings.signUp.error.passwordChar}</span>
                  </>
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
                {!passwordRequired ? null : (
                  <span>{strings.signUp.error.confPassword}</span>
                )}
                {!passwordMatch ? null : (
                  <span>{strings.signUp.error.passwordMatch}</span>
                )}
              </div>
              {signUpErrorMessage && (
                <span className={classNames(styles.errorMessage)}>
                  {strings.signUp.error.message}
                </span>
              )}
              <Button
                buttonType="submit"
                className={classNames(styles.signUpButton)}
                text={strings.signUp.buttonText}
                onClick={checkForm}
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SignUp;
