import React from "react";
import { Route, Routes } from "react-router-dom";

import AboutUs from "./pages/about/aboutUs";
import Faq from "./pages/faq/faq";
import HelpUs from "./pages/helpUs/helpUs";
import AddCafe from "./pages/addCafe/addCafe";
import Explore from "./pages/explore/explore";
import Account from "./pages/account/account";
import "./App.scss";
import Body from "./component/Body";
import Login from "./pages/login/login";
import SignUp from "./pages/sign-up/signUp";

function App() {
  return (
    <div className="App">
      <Body>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/helpUs" element={<HelpUs />} />
          <Route path="/account" element={<Account />} />
          <Route path="/addCafe" element={<AddCafe />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Body>
    </div>
  );
}

export default App;
