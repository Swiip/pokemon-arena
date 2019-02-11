import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SyncAsync = ({ async }) => {
  const toSync = () => {
    window.location.href = "/";
  };
  const toAsync = () => {
    window.location.href = "/?async";
  };
  return (
    <Container>
      <button disabled={!async} onClick={toSync}>
        Normal rendering
      </button>
      <button disabled={async} onClick={toAsync}>
        Concurrent rendering
      </button>
    </Container>
  );
};

export default SyncAsync;
