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
import LoadingSpinner from "component/common/LoadingSpinner";

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
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "", // need to change to password from db and the password that comes back is encrypted
    confPassword: "",
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [editInfoError, setEditInfoError] = useState(false);

  const { loading, refetch } = useQuery(getUserInfo, {
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
      alert(error);
      console.log("Error updating user info."); // change this to require config/strings.ts later
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
    if (edit) {
      window.location.reload();
    }
  };

  const handleUserInfo = () => {
    if (
      userInfo.firstName === "" &&
      userInfo.lastName === "" &&
      userInfo.email === ""
    ) {
      setEditInfoError(true);
    } else {
      setEditInfoError(false);
    }
  };

  const handleEditAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInfo.firstName.trim() !== "") {
      updateUser({
        variables: {
          userName: userName,
          firstName: userInfo.firstName,
        },
      });
    }
    if (userInfo.lastName.trim() !== "") {
      updateUser({
        variables: {
          userName: userName,
          lastName: userInfo.lastName,
        },
      });
    }
    if (userInfo.email.trim() !== "") {
      updateUser({
        variables: {
          userName: userName,
          email: userInfo.email,
        },
      });
    }
    //need to encrypt new password and check if it's the same as old password

    // if (passwordMatch === true && userInfo.password !== "") {
    //   updateUser({
    //     variables: {
    //       userName: userName,
    //       password: userInfo.password,
    //     },
    //   });
    // }
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPasswordRequired(!value);
    setPasswordMatch(userInfo.password !== userInfo.confPassword);
    console.log("password: " + userInfo.password);
    console.log("confpass: " + userInfo.confPassword);
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
        {loading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
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
            <div className={classNames(styles.profileContainer)}>
              <div
                className={classNames(styles.profilePhoto)}
                onClick={handleProfilePhoto}
              >
                <img src={Logo} alt={Logo} />
              </div>
              <div>
                <h2>{userName}</h2>
              </div>
            </div>
            <div className={classNames(styles.accountContainer)}>
              <div className={classNames(styles.account)}>
                <form
                  noValidate
                  onSubmit={handleEditAccount}
                  className={classNames(styles.accountForm)}
                >
                  <div className={classNames(styles.nameContainer)}>
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
                        text={strings.global.label.name}
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
                        name={"lastName"}
                        handleChange={handleChange}
                        disabled={!edit ? true : false}
                        validateLoginInput={() =>
                          setLastNameIsValid(
                            !regexValidator.validLastName.test(
                              userInfo.lastName
                            )
                          )
                        }
                        errorMessage={renderErrorMessage(
                          !lastNameIsValid,
                          strings.account.errorMessage.lastName
                        )}
                        maxLength={40}
                      />
                    </div>
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
                      validateLoginInput={() =>
                        setEmailIsValid(
                          !regexValidator.validEmail.test(userInfo.email)
                        )
                      }
                      errorMessage={renderErrorMessage(
                        !emailIsValid,
                        strings.signUp.errorMessage.email
                      )}
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
                      validateLoginInput={() =>
                        setPasswordIsValid(
                          !regexValidator.validPassword.test(userInfo.password)
                        )
                      }
                      errorMessage={renderErrorMessage(
                        !passwordIsValid,
                        strings.signUp.errorMessage.password,
                        strings.signUp.errorMessage.passwordChar
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
                        placeholder={"********"}
                        text={strings.global.label.verifyPassword}
                        name={"confPassword"}
                        handleChange={handleChange}
                        disabled={!edit ? true : false}
                        validateLoginInput={handlePassword}
                        errorMessage={renderErrorMessage(
                          !passwordRequired,
                          strings.signUp.errorMessage.confPassword
                        )}
                        secondErrorMessage={renderErrorMessage(
                          !passwordMatch,
                          strings.signUp.errorMessage.passwordMatch
                        )}
                      />
                    </div>
                  ) : null}
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
                        onClick={handleUserInfo}
                      />
                    </div>
                  ) : null}
                </form>
                {editInfoError && (
                  <span className={classNames(styles.errorMessage)}>
                    {strings.account.errorMessage.fieldError}
                  </span>
                )}
              </div>
            </div>
            {!edit ? (
              <div className={classNames(styles.editText)}>
                <label>
                  <a
                    className={classNames(styles.editLink)}
                    onClick={() => handleEditButton()}
                  >
                    EDIT
                  </a>
                </label>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
      <Footer />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Account;
