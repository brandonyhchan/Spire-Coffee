import React from "react";
import { Route, Routes } from "react-router-dom";

import AboutUs from "./component/pages/aboutUs/aboutUs";
import Faq from "./component/pages/faq/faq";
import HelpUs from "./component/pages/helpUs/helpUs";
import AddCafe from "./component/pages/addCafe/addCafe";
import Explore from "./component/pages/explore/explore";
import Account from "./component/pages/account/account";
import Favourites from "component/pages/favourites/favourites";
import CafePage from "./component/pages/cafe/cafe";
import "./App.scss";
import Body from "./component/Body";
import Login from "./component/pages/login/login";
import SignUp from "./component/pages/sign-up/signUp";

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
          <Route path="/cafes/:cafeId" element={<CafePage />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Body>
    </div>
  );
}

export default App;
