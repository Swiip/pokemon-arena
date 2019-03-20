import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SyncAsync = ({ async, setAsync }) => (
  <Container>
    <button disabled={!async} onClick={() => setAsync(false)}>
      Normal rendering
    </button>
    <button disabled={async} onClick={() => setAsync(true)}>
      Concurrent rendering
    </button>
  </Container>
);

export default SyncAsync;
