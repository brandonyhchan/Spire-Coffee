import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLazyQuery } from "@apollo/client";
import { cafeMutation } from "support/graphqlServerApi";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Form from "component/common/Form/Form";
import FormItem from "component/common/Form/FormItem";
import styles from "./addCafe.module.scss";
import strings from "config/strings";
import { SelectOptions } from "component/common/Filter/FilterType/RadioFilter";

const AddCafe = () => {
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [addCafe] = useLazyQuery(cafeMutation, {
    onError: (error) => {
      alert(error);
    },
    onCompleted: () => {
      console.log("Error in adding a cafe.");
    },
  });

  const [priceOption, setPriceOption] = useState<SelectOptions>();
  const [tableOption, setTableOption] = useState<SelectOptions>();
  const [cafeInfo, setCafeInfo] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handleAddCafe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCafe({
      variables: {
        name: cafeInfo.name,
        street: cafeInfo.street,
        city: cafeInfo.city,
        province: cafeInfo.province,
        postalCode: cafeInfo.postalCode,
        numTables: tableOption,
        price: priceOption,
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    setCafeInfo({
      ...cafeInfo,
      [name]: value,
    });
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
            formType={"addCafe"}
          >
            <FormItem
              type={"text"}
              handleChange={handleChange}
              name={"name"}
              text={"Name"}
            />
            <FormItem
              type={"text"}
              handleChange={handleChange}
              name={"street"}
              text={"Street"}
            />
            <FormItem
              type={"text"}
              handleChange={handleChange}
              name={"city"}
              text={"City"}
            />
            <FormItem
              type={"text"}
              handleChange={handleChange}
              name={"province"}
              text={"Province"}
            />
            <FormItem
              type={"text"}
              handleChange={handleChange}
              name={"postalCode"}
              text={"Postal Code"}
            />
            <FormItem
              type={"radio"}
              handleChange={() => setTableOption(SelectOptions.LOW)}
              name={"numberOfTables"}
              text={"0 - 5"}
            />
            <FormItem
              type={"radio"}
              handleChange={() => setTableOption(SelectOptions.MEDIUM)}
              name={"numberOfTables"}
              text={"6 - 10"}
            />
            <FormItem
              type={"radio"}
              handleChange={() => setTableOption(SelectOptions.HIGH)}
              name={"numberOfTables"}
              text={"10+"}
            />
            <FormItem
              type={"radio"}
              handleChange={() => setPriceOption(SelectOptions.LOW)}
              name={"price"}
              text={"Not expensive"}
            />
            <FormItem
              type={"radio"}
              handleChange={() => setPriceOption(SelectOptions.MEDIUM)}
              name={"price"}
              text={"Somewhat expensive"}
            />
            <FormItem
              type={"radio"}
              handleChange={() => setPriceOption(SelectOptions.HIGH)}
              name={"price"}
              text={"Expensive"}
            />
            {/* need to put number of tables options and price? */}
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddCafe;
