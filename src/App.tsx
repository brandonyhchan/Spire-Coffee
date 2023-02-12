import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Login from "./component/login/login";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Helmet title="React Starter" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
