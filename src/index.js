import React from "react";
import { render, createRoot } from "react-dom";
import styled from "styled-components";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";

import ErrorHandler from "./components/errors";
import Welcome from "./components/home/welcome";
import ChoiceForm from "./components/arena/choice/form";
import Arena from "./components/arena/arena";
import Stats from "./components/stats/stats";
import Debug from "./components/debug";

const Container = styled.div`
  font-family: sans-serif;
  min-height: 100vh;
  min-width: 100vw;
`;

const rootAsyncElement = document.getElementById("async-root");
const rootSyncElement = document.getElementById("sync-root");

const syncRender = () => {
  rootAsyncElement.style.display = "none";
  rootSyncElement.style.display = "block";
  render(<App />, rootSyncElement);
};

const asyncRender = () => {
  rootSyncElement.style.display = "none";
  rootAsyncElement.style.display = "block";
  const rootAsync = createRoot(rootAsyncElement);

  rootAsync.render(<App async />);
};

const App = ({ async }) => (
  <BrowserRouter>
    <ErrorHandler>
      <Container>
        <Route path="/" exact component={Welcome} />
        <Route path="/arena/choice" exact component={ChoiceForm} />
        <Route path="/arena/:first/:second" exact component={Arena} />
        <Route path="/stats" exact component={() => <Stats async={async} />} />
      </Container>
      <Debug async={async} syncRender={syncRender} asyncRender={asyncRender} />
    </ErrorHandler>
  </BrowserRouter>
);

syncRender();
