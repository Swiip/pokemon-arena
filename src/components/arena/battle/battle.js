import React, { useReducer, useEffect } from "react";
import styled from "styled-components";

import Opponent from "./opponent";
import Logs from "./logs";
import { loadData } from "./battle-data";
import { initialState, reducer, fight } from "./battle-logic";

const Container = styled.div`
  max-width: 600px;
  min-height: 400px;
  width: 100%;
  margin: 0 auto;
  background-image: url("/battle.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  border: 2px solid #ffffff;
`;

const ArenaContent = ({ match }) => {
  const data = loadData(match.params);
  const [state, dispatch] = useReducer(reducer, initialState(data));
  useEffect(() => fight(state, dispatch));

  return (
    <>
      <Container>
        <Opponent position="first" data={state.first} />
        <Opponent position="second" data={state.second} />
      </Container>
      <Logs logs={state.logs} />
    </>
  );
};

export default ArenaContent;
