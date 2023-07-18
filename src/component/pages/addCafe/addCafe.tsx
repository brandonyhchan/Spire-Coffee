import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Form from "component/common/Form/Form";
import FormItem from "component/common/Form/FormItem";
import styles from "./addCafe.module.scss";
import strings from "config/strings";

const AddCafe = () => {
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleAddCafe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    // setUserInfo({
    //   ...userInfo,
    //   [name]: value,
    // });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.addCafe.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.addCafe)}>
          <Form
            className={classNames(styles.addCafeForm)}
            handleForm={handleAddCafe}
          >
            <FormItem type={"text"} handleChange={handleChange} name="name" />
            <FormItem
              type={"text"}
              handleChange={handleChange}
              name="address"
            />
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddCafe;
