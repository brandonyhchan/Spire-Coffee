import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { signUpMutation } from "support/graphqlServerApi";
import RegexValidator from "./regexValidator";
import Button from "component/common/Button";
import FormItem from "component/common/Form/FormItem";
import Form from "component/common/Form/Form";
import ErrorMessage from "component/common/ErrorMessage/ErrorMessage";
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

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.code === "Enter") {
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

  const renderErrorMessage = (
    isValid: boolean,
    errorMessage: string,
    secondErrorMessage?: string
  ) => {
    return isValid ? null : (
      <>
        <ErrorMessage text={errorMessage} />
        <ErrorMessage text={secondErrorMessage} />
      </>
    );
  };

  function renderButton() {
    return (
      <div className={classNames(styles.editButtonGroup)}>
        <Button
          buttonType="submit"
          text={strings.signUp.buttonText}
          onClick={checkForm}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.signUpContainer)}>
          <h3 className={classNames(styles.heading)}>{strings.signUp.title}</h3>
          <div className={classNames(styles.signUp)}>
            <Form
              className={classNames(styles.signUpForm)}
              handleForm={handleSignUp}
              buttonGroup={renderButton()}
              handleKeyEvent={handleKeyEvent}
              formType={"signup"}
            >
              <FormItem
                type={"text"}
                placeholder={strings.global.label.username}
                text={strings.global.label.username}
                name={"username"}
                value={userInfo.username}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setUsernameIsValid(
                    !regexValidator.validUsername.test(userInfo.username)
                  )
                }
                errorMessage={renderErrorMessage(
                  !usernameIsValid,
                  strings.global.errorMessage.username
                )}
              />
              <FormItem
                type={"text"}
                placeholder={strings.global.label.firstName}
                text={strings.global.label.firstName}
                name={"firstName"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setFirstNameIsValid(
                    !regexValidator.validFirstName.test(userInfo.firstName)
                  )
                }
                errorMessage={renderErrorMessage(
                  !firstNameIsValid,
                  strings.global.errorMessage.firstName
                )}
                maxLength={40}
              />
              <FormItem
                type={"text"}
                placeholder={strings.global.label.lastName}
                text={strings.global.label.lastName}
                name={"lastName"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setLastNameIsValid(
                    !regexValidator.validLastName.test(userInfo.lastName)
                  )
                }
                errorMessage={renderErrorMessage(
                  !lastNameIsValid,
                  strings.global.errorMessage.lastName
                )}
                maxLength={40}
              />
              <FormItem
                type={"text"}
                placeholder={strings.global.label.email}
                text={strings.global.label.email}
                name={"email"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setEmailIsValid(
                    !regexValidator.validEmail.test(userInfo.email)
                  )
                }
                errorMessage={renderErrorMessage(
                  !emailIsValid,
                  strings.global.errorMessage.email
                )}
              />
              <FormItem
                type={"password"}
                placeholder={strings.global.label.password}
                text={strings.global.label.password}
                name={"password"}
                handleChange={handleChange}
                validateLoginInput={() =>
                  setPasswordIsValid(
                    !regexValidator.validPassword.test(userInfo.password)
                  )
                }
                errorMessage={renderErrorMessage(
                  !passwordIsValid,
                  strings.global.errorMessage.password,
                  strings.global.errorMessage.passwordChar
                )}
              />
              <FormItem
                type={"password"}
                placeholder={strings.global.label.verifyPassword}
                text={strings.global.label.verifyPassword}
                name={"confPassword"}
                handleChange={handleChange}
                validateLoginInput={handlePassword}
                errorMessage={renderErrorMessage(
                  !passwordRequired,
                  strings.global.errorMessage.confPassword
                )}
                secondErrorMessage={renderErrorMessage(
                  !passwordMatch,
                  strings.global.errorMessage.passwordMatch
                )}
              />
            </Form>
            {signUpErrorMessage && (
              <ErrorMessage text={strings.global.errorMessage.message} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
