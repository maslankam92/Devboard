import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./styles/bootstrap.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

const Index = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={App} />
        </>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
