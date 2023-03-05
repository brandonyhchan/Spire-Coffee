import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Login from "./component/login/login";
import Home from "./component/home/home";
import About from "./component/about/about"
import Faq from "./component/faq/faq";
import HelpUs from "./component/helpUs/helpUs";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Helmet title="React Starter" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/helpUs" element={<HelpUs/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
