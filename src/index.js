import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";

import ErrorHandler from "./components/errors";
import Welcome from "./components/welcome";
import Form from "./components/form";
import Arena from "./components/arena";

const Container = styled.div`
  font-family: sans-serif;
  min-height: 100vh;
  min-width: 100vw;
`;

const App = () => (
  <BrowserRouter>
    <ErrorHandler>
      <Container>
        <Route path="/" exact component={Welcome} />
        <Route path="/form" exact component={Form} />
        <Route path="/arena/:first/:second" exact component={Arena} />
      </Container>
    </ErrorHandler>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
