import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Body from "./component/Body";
import Login from "./component/login/login";
import SignUp from "./component/sign-up/signUp";

function App() {
  return (
    <div className="App">
      <Body>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Body>
    </div>
  );
}

export default App;
