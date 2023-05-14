import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { signUpMutation } from "support/graphqlServerApi";
import RegexValidator from "./regexValidator";
import Button from "component/common/Button";
import FormItem from "component/Form/FormItem";
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

  function renderErrorMessage(
    isValid: boolean,
    errorMessage: string,
    secondErrorMessage?: string
  ) {
    return isValid ? null : (
      <>
        <span>{errorMessage}</span>
        <span>{secondErrorMessage}</span>
      </>
    );
  }

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
              <FormItem
                className={styles.formItem}
                type={"text"}
                text={strings.login.usernameLabel}
                name={"username"}
                value={userInfo.username}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setUsernameIsValid(
                    !regexValidator.validUsername.test(userInfo.username)
                  )
                }
                renderErrorMessage={renderErrorMessage(
                  !usernameIsValid,
                  strings.signUp.errorMessage.username
                )}
              />
              <FormItem
                className={styles.formItem}
                type={"text"}
                text={strings.signUp.firstNameLabel}
                name={"firstName"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setFirstNameIsValid(
                    !regexValidator.validFirstName.test(userInfo.firstName)
                  )
                }
                renderErrorMessage={renderErrorMessage(
                  !firstNameIsValid,
                  strings.signUp.errorMessage.firstName
                )}
                maxLength={40}
              />
              <FormItem
                className={styles.formItem}
                type={"text"}
                text={strings.signUp.lastNameLabel}
                name={"lastName"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setLastNameIsValid(
                    !regexValidator.validLastName.test(userInfo.lastName)
                  )
                }
                renderErrorMessage={renderErrorMessage(
                  !lastNameIsValid,
                  strings.signUp.errorMessage.lastName
                )}
                maxLength={40}
              />
              <FormItem
                className={styles.formItem}
                type={"text"}
                text={strings.signUp.emailLabel}
                name={"email"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setEmailIsValid(
                    !regexValidator.validEmail.test(userInfo.email)
                  )
                }
                renderErrorMessage={renderErrorMessage(
                  !emailIsValid,
                  strings.signUp.errorMessage.email
                )}
              />
              <FormItem
                className={styles.formItem}
                type={"password"}
                text={strings.signUp.passwordLabel}
                name={"password"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setPasswordIsValid(
                    !regexValidator.validPassword.test(userInfo.password)
                  )
                }
                renderErrorMessage={renderErrorMessage(
                  !passwordIsValid,
                  strings.signUp.errorMessage.password,
                  strings.signUp.errorMessage.passwordChar
                )}
              />
              <FormItem
                className={styles.formItem}
                type={"password"}
                text={strings.signUp.verifyPasswordLabel}
                name={"confPassword"}
                handleChange={handleChange}
                validateLoginInput={handlePassword}
                renderErrorMessage={renderErrorMessage(
                  !passwordRequired,
                  strings.signUp.errorMessage.confPassword
                )}
                renderSecondErrorMessage={renderErrorMessage(
                  !passwordMatch,
                  strings.signUp.errorMessage.passwordMatch
                )}
              />
              {signUpErrorMessage && (
                <span className={classNames(styles.errorMessage)}>
                  {strings.signUp.errorMessage.message}
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
