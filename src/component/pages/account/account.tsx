/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getUserInfo, userMutation } from "support/graphqlServerApi";
import { useQuery, useMutation } from "@apollo/client";
import RegexValidator from "component/pages/signUp/regexValidator";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import FormItem from "component/common/Form/FormItem";
import Button from "component/common/Button";
import Logo from "assets/images/placeholder-logo.jpg";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import LoadingSpinner from "component/common/LoadingSpinner";
import Form from "./Form";

import classNames from "classnames";
import styles from "./account.module.scss";
import strings from "config/strings";

const Account = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");
  const regexValidator: RegexValidator = new RegexValidator();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState<boolean>(false);
  const [lastNameIsValid, setLastNameIsValid] = useState<boolean>(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
  const [editInfoError, setEditInfoError] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);

  const { loading, refetch } = useQuery(getUserInfo, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setUserInfo(data?.getUserInfo);
    },
    variables: {
      userName: userName,
    },
  });

  const [updateUser] = useMutation(userMutation, {
    onError: (error) => {
      setEditInfoError(true);
    },
    onCompleted: () => {
      window.location.reload();
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

  const handleEditButton = () => {
    setEdit(!edit);
    setEditPassword(false);
    if (edit) {
      window.location.reload();
    }
  };

  const handleEditAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      userInfo.firstName !== "" ||
      userInfo.lastName !== "" ||
      userInfo.email !== ""
    ) {
      //to update userinfo all fields must be filled in
      updateUser({
        variables: {
          userName: userName,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        },
      });
    }
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPasswordRequired(!value);
    setPasswordMatch(userInfo.password !== userInfo.confPassword);
  };

  const handleProfilePhoto = () => {
    console.log("Change profile photo.");
  };

  const renderErrorMessage = (
    isValid: boolean,
    errorMessage: string,
    secondErrorMessage?: string
  ) => {
    return isValid ? null : (
      <>
        <span>{errorMessage}</span>
        <span>{secondErrorMessage}</span>
      </>
    );
  };

  const renderPassword = () => {
    return (
      <form className={classNames(styles.passwordForm)}>
        <div>
          <div
            className={
              !edit
                ? classNames(styles.inputWrapper)
                : classNames(styles.editInputWrapper)
            }
          >
            <FormItem
              className={styles.formItem}
              type={"password"}
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              text={
                !edit
                  ? strings.global.label.password
                  : strings.global.label.newPassword
              }
              name={"password"}
              handleChange={handleChange}
              disabled={!edit ? true : false}
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
          </div>
          {edit ? (
            <div
              className={
                !edit
                  ? classNames(styles.inputWrapper)
                  : classNames(styles.editInputWrapper)
              }
            >
              <FormItem
                className={styles.formItem}
                type={"password"}
                text={strings.global.label.verifyNewPassword}
                name={"confPassword"}
                handleChange={handleChange}
                disabled={!edit ? true : false}
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
            </div>
          ) : null}
        </div>
        {edit ? (
          <div className={classNames(styles.passwordButton)}>
            <Button text={"Save Password"} buttonType="submit" />
          </div>
        ) : null}
      </form>
    );
  };

  return (
    <React.Fragment>
      <Helmet title={strings.account.helmet} />
      <NavBar />
      <div className={classNames(styles.wrapper)}>
        <div className={classNames(styles.container)}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <React.Fragment>
              {!edit ? (
                <div className={classNames(styles.editContainer)}>
                  <label className={classNames(styles.editLink)}>
                    <a
                      className={classNames(styles.editLink)}
                      onClick={() => handleEditButton()}
                    >
                      {strings.account.edit}
                    </a>
                  </label>
                  <ModeEditOutlineOutlinedIcon
                    className={classNames(styles.editIcon)}
                    onClick={() => handleEditButton()}
                  />
                </div>
              ) : null}
              <div className={classNames(styles.profileContainer)}>
                <div className={classNames(styles.profileWrapper)}>
                  <div className={classNames(styles.profilePhoto)}>
                    <img
                      src={Logo}
                      alt={Logo}
                      className={classNames(styles.profilePhotoImage)}
                    />
                    <div
                      className={classNames(styles.overlay)}
                      onClick={handleProfilePhoto}
                    >
                      <div className={classNames(styles.editProfilePhotoText)}>
                        {strings.account.editProfilePictureText}
                      </div>
                    </div>
                  </div>
                  <div
                    className={classNames(styles.profilePhotoButton)}
                    onClick={handleProfilePhoto}
                  >
                    <label>
                      <AddPhotoAlternateRoundedIcon
                        className={classNames(styles.editIcon)}
                      />
                    </label>
                  </div>
                </div>
                <div className={classNames(styles.username)}>
                  <h2>{userName}</h2>
                </div>
              </div>
              <div className={classNames(styles.accountInfoContainer)}>
                <div className={classNames(styles.userInfoContainer)}>
                  <Form
                    handleEditAccount={handleEditAccount}
                    edit={edit}
                    handleEditButton={handleEditButton}
                    editInfoError={editInfoError}
                    editPassword={editPassword}
                    setEditPassword={() => setEditPassword(true)}
                  >
                    <FormItem
                      className={styles.formItem}
                      type={"text"}
                      value={userInfo.firstName}
                      text={strings.global.label.firstName}
                      name={"firstName"}
                      handleChange={handleChange}
                      disabled={!edit ? true : false}
                      validateLoginInput={() =>
                        setFirstNameIsValid(
                          !regexValidator.validFirstName.test(
                            userInfo.firstName
                          )
                        )
                      }
                      errorMessage={renderErrorMessage(
                        !firstNameIsValid,
                        strings.global.errorMessage.firstName
                      )}
                      maxLength={40}
                    />
                    <FormItem
                      className={styles.formItem}
                      type={"text"}
                      value={userInfo.lastName}
                      text={strings.global.label.lastName}
                      name={"lastName"}
                      handleChange={handleChange}
                      disabled={!edit ? true : false}
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
                      className={styles.formItem}
                      type={"text"}
                      value={userInfo.email}
                      text={strings.global.label.email}
                      name={"email"}
                      handleChange={handleChange}
                      disabled={!edit ? true : false}
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
                  </Form>
                </div>
                <div
                  className={
                    !editPassword
                      ? classNames(styles.passwordContainer)
                      : classNames(styles.editPasswordContainer)
                  }
                >
                  {editPassword && renderPassword()}
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Account;
