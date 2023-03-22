import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Login from "./component/login/login";
import Home from "./component/home/home";
import About from "./component/about/about"
import Faq from "./component/faq/faq";
import HelpUs from "./component/helpUs/helpUs";
import AddCafe from "./component/addCafe/addCafe";
import Explore from "./component/explore/explore";
import Account from "./component/account/account";
import "./App.scss";
import Body from "./component/Body";

function App() {
  return (
    <div className="App">
      <Body>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/helpUs" element={<HelpUs/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/addCafe" element={<AddCafe/>} />
          <Route path="/explore" element={<Explore/>} />

        </Routes>
      </Body>
    </div>
  );
}

export default App;
