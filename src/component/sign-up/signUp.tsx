import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./signUp.module.scss";
import { useLazyQuery } from "@apollo/client";
import { signUpMutation } from "../../support/graphqlServerApi";
import { useNavigate } from "react-router-dom";

type SignUpFormData = {
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  verifyPassword: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState(""); // this will be used to check if the password is the same in the

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

  const handleSignup = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    signUp({
      variables: {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <h1 className={classNames(styles.heading)}>{strings.signUp.title}</h1>
      <div className={classNames(styles.signUpContainer)}>
        <div className={classNames(styles.signUp)}>
          <form
            className={classNames(styles.signUpForm)}
            onFocus={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.usernameLabel}
                required
                {...register("username", { required: true })}
                onChange={(e) => {
                  setUserName(e.currentTarget.value);
                }}
              />
              <label>{strings.signUp.usernameLabel}</label>
              {errors.username && (
                <span className={classNames(styles.expanded)}>
                  Username is required.
                </span>
              )}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.firstNameLabel}
                required
                {...register("firstName", { required: true })}
                onChange={(e) => {
                  setFirstName(e.currentTarget.value);
                }}
              />
              <label>{strings.signUp.firstNameLabel}</label>
              {errors.firstName && <span>First name is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.lastNameLabel}
                required
                {...register("lastName", { required: true })}
                onChange={(e) => {
                  setLastName(e.currentTarget.value);
                }}
              />
              <label>{strings.signUp.lastNameLabel}</label>
              {errors.lastName && <span>Last name is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.emailLabel}
                required
                {...register("emailAddress", { required: true })}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <label>{strings.signUp.emailLabel}</label>
              {errors.emailAddress && <span>Email address is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.passwordLabel}
                required
                {...register("password", { required: true })}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <label>{strings.signUp.passwordLabel}</label>
              {errors.password && <span>Password is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="password"
                placeholder={strings.signUp.verifyPasswordLabel}
                required
                {...register("verifyPassword", { required: true })}
                onChange={(e) => {
                  setConfPassword(e.currentTarget.value);
                }}
              />
              <label>{strings.signUp.verifyPasswordLabel}</label>
              {errors.verifyPassword && (
                <span>Please re-enter your password.</span>
              )}
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
