import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./component/login/login";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
