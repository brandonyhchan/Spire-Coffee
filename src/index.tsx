import React, { FunctionComponent } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_,{ headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(
    createHttpLink({
      uri: "http://localhost:4000",
      credentials: "same-origin",
    })
  ),
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");

if (container === null) throw new Error("Root container missing in index.html");
const root = createRoot(container);

const render = (Component: FunctionComponent) => {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Router>
          <Component />
        </Router>
      </HelmetProvider>
    </React.StrictMode>
  );
};

render(App);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
