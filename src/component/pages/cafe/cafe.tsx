import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";

const Cafe = () => {
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <React.Fragment>
      <Helmet title={"hello world"} />
      <Navbar />
      <div>
        <h1>Hello world this is the cafe page</h1>
      </div>

      {/* <Footer />
      <MobileFooter /> */}
    </React.Fragment>
  );
};
export default Cafe;
