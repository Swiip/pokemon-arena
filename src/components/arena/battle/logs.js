import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 500px;
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 500px;
  background-color: white;
  color: black;
  border: 3px solid black;
  border-radius: 5px;
  padding: 10px;
`;

const Line = styled.p`
  :first-child {
    font-weight: bold;
    color: red;
    font-size: 20px;
  }

  strong {
    font-weight: bold;
    color: blue;
  }
`;

const Logs = ({ logs }) => (
  <Container>
    {logs.map((log, i) => (
      <Line key={i}>
      {
        log.type === 'attack' ? (
          <>
            <strong>{log.attackerName}</strong> attack
            with <strong>{log.move}</strong> and
            does <strong>{log.damage}</strong> damage.
          </>
        ) :
        (<>{log.name} wins!</>)
      }
      </Line>
    ))}
  </Container>
);

export default Logs;
