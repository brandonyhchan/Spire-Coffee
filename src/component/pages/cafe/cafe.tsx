import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { getCafeInfo } from "support/graphqlServerApi";
import { useQuery } from "@apollo/client";
import { Cafe } from "types/api/cafe";

import Navbar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import LoadingSpinner from "component/common/LoadingSpinner";

const CafePage = () => {
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const token = localStorage.getItem("authToken");

  const [cafe, setCafe] = useState<Cafe>();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const { loading, error, refetch } = useQuery(getCafeInfo, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafe(data?.getCafeInfo);
    },
    variables: {
      stringId: cafeId,
    },
  });

  return (
    <React.Fragment>
      <Helmet title={cafe?.name} />
      <Navbar />
      <div>
        {loading && <LoadingSpinner className="" />}
        <h1>Hello world this is the cafe page</h1>
      </div>

      {/* <Footer />
      <MobileFooter /> */}
    </React.Fragment>
  );
};
export default CafePage;
