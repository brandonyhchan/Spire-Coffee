import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getUserInfo, userMutation } from "support/graphqlServerApi";
import { useQuery, useMutation } from "@apollo/client";
import { User } from "types/api/user";
import RegexValidator from "component/pages/signUp/regexValidator";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import FormItem from "component/common/Form/FormItem";
import Button from "component/common/Button";
import Logo from "assets/images/placeholder-logo.jpg";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

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

  const [user, setUser] = useState<User>();
  const [userInfo, setUserInfo] = useState({
    username: user?.userName,
    firstName: user?.firstName || "",
    lastName: user?.lastName,
    email: user?.email,
    password: "", // need to change to password from db and the password that comes back is encrypted
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [editAccountError, setEditAccountError] = useState(false);
  const [editAccountErrorMessage, setEditAccountErrorMessage] = useState(false);

  const { refetch } = useQuery(getUserInfo, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setUser(data?.getUserInfo);
    },
    variables: {
      userName: userName,
    },
  });

  const [updateUser] = useMutation(userMutation, {
    onError: (error) => {
      setEditAccountError(true);
      alert(error);
      console.log("Error updating user info."); // change this to require config/strings.ts later
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
  };

  const handleEditAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editAccountError === false) {
      updateUser({
        variables: {
          userName: userName, // right now username is not editable, to make it update,
          //we need to change the fetch of user from username to id
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        },
      });
    }
  };

  const checkForm = () => {
    if (
      userInfo.firstName.trim() === "" ||
      userInfo.lastName === "" ||
      userInfo.email === ""
    ) {
      setEditAccountError(true);
      setEditAccountErrorMessage(true);
    } else {
      setEditAccountError(false);
      setEditAccountErrorMessage(false);
    }
  };

  const handleProfilePhoto = () => {
    console.log("Change profile photo.");
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
      <Helmet title={strings.account.helmet} />
      <NavBar />
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.headerContainer)}>
          <div className={classNames(styles.title)}>
            <h2>{strings.account.title}</h2>
          </div>

          <div className={classNames(styles.editButton)}>
            {!edit ? (
              <ModeEditOutlineOutlinedIcon
                className={classNames(styles.editIcon)}
                onClick={() => handleEditButton()}
              />
            ) : null}
          </div>
        </div>
        <div className={classNames(styles.profilePhotoContainer)}>
          <div
            className={classNames(styles.profilePhoto)}
            onClick={handleProfilePhoto}
          >
            <img src={Logo} alt={Logo} />
          </div>
        </div>
        <div className={classNames(styles.accountContainer)}>
          <div className={classNames(styles.account)}>
            <form
              noValidate
              onSubmit={handleEditAccount}
              className={classNames(styles.accountForm)}
            >
              <div
                className={
                  !edit
                    ? classNames(styles.inputWrapper)
                    : classNames(styles.editInputWrapper)
                }
              >
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={user?.userName}
                  text={strings.global.label.username}
                  name={"username"}
                  handleChange={handleChange}
                  disabled={!edit ? true : false}
                />
              </div>
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
                  placeholder={"********"}
                  text={strings.global.label.password}
                  name={"password"}
                  handleChange={handleChange}
                  disabled={!edit ? true : false}
                />
              </div>
              <div
                className={
                  !edit
                    ? classNames(styles.inputWrapper)
                    : classNames(styles.editInputWrapper)
                }
              >
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={user?.email}
                  text={strings.global.label.email}
                  name={"email"}
                  handleChange={handleChange}
                  disabled={!edit ? true : false}
                />
              </div>
              <div
                className={
                  !edit
                    ? classNames(styles.inputWrapper)
                    : classNames(styles.editInputWrapper)
                }
              >
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={user?.firstName}
                  text={strings.global.label.firstName}
                  name={"firstName"}
                  handleChange={handleChange}
                  disabled={!edit ? true : false}
                  validateLoginInput={() =>
                    setFirstNameIsValid(
                      !regexValidator.validFirstName.test(userInfo.firstName)
                    )
                  }
                  errorMessage={renderErrorMessage(
                    !firstNameIsValid,
                    strings.account.errorMessage.firstName
                  )}
                  maxLength={40}
                />
              </div>
              <div
                className={
                  !edit
                    ? classNames(styles.inputWrapper)
                    : classNames(styles.editInputWrapper)
                }
              >
                <FormItem
                  className={styles.formItem}
                  type={"text"}
                  placeholder={user?.lastName}
                  text={strings.global.label.lastName}
                  name={"lastName"}
                  handleChange={handleChange}
                  disabled={!edit ? true : false}
                />
              </div>
              {edit ? (
                <div className={classNames(styles.editButtonGroup)}>
                  {/* need to change to use reset button izzy made on branch 17 */}
                  <Button
                    buttonType="reset"
                    text={"Cancel"}
                    onClick={handleEditButton}
                  />
                  <Button
                    text={"Save"}
                    buttonType="submit"
                    name={strings.global.name.username}
                    onClick={checkForm}
                  />
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Account;
