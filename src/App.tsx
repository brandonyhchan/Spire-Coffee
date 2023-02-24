import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Login from "./component/login/login";
import Home from "./component/home/home";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Helmet title="React Starter" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
