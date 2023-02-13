import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Body from "./component/Body";
import Login from "./component/login/login";

function App() {
  return (
    <div className="App">
      <Body>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Body>
    </div>
  );
}

export default App;
