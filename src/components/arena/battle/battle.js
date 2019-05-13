import React, { useReducer, useEffect } from "react";
import styled from "styled-components";

import Opponent from "./opponent";
import Logs from "./logs";
import { loadData } from "./battle-data";
import { initialState, reducer, fight } from "./battle-logic";

const Container = styled.div`
  padding-bottom: 2rem;
`;

const OpponentContainer = styled.div`
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

  const winner = state.logs[0] && state.logs[0].type === 'win' && state.logs[0].name;
  const isFirstAttacking = state.logs && state.logs[0] && state.logs[0].attackerName === state.first.name;
  const isSecondAttacking = state.logs && state.logs[0] && state.logs[0].attackerName === state.second.name;

  return (
    <Container>
      <OpponentContainer>
        <Opponent position="first" data={state.first} attacking={isFirstAttacking} dead={winner && winner !== state.first.name} />
        <Opponent position="second" data={state.second} attacking={isSecondAttacking} dead={winner && winner !== state.second.name} />
      </OpponentContainer>
      <Logs logs={state.logs} />
    </Container>
  );
};

export default ArenaContent;
