import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getUserInfo } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { User } from "types/api/user";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import FormItem from "component/Form/FormItem";
import Button from "component/common/Button";
import Logo from "assets/images/placeholder-logo.jpg";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import styles from "./account.module.scss";
import strings from "config/strings";

const Account = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [user, setUser] = useState<User>();
  const [edit, setEdit] = useState<boolean>(false);

  const { loading, error, refetch } = useQuery(getUserInfo, {
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

  console.log(user);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleEditAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // editAccount({
    //   variables: {
    //     userName: userInfo.username,
    //     password: userInfo.password,
    //     email: userInfo.email,
    //     firstName: userInfo.firstName,
    //     lastName: userInfo.lastName,
    //   },
    // });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    // setUserInfo({
    //   ...userInfo,
    //   [name]: value,
    // });
  };

  const handleEditButton = () => {
    setEdit(!edit);
  };

  const handleSubmit = () => {
    console.log("Submit edit changes.");
  };

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
          <div className={classNames(styles.profilePhoto)}>
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
                    name={strings.global.name.username}
                    onClick={handleSubmit}
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
