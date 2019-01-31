import React, { useState } from "react";
import styled, { css } from "styled-components";

import SyncAsync from "./syncAsync";
import Latency from "./latency";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  border-top: 2px solid black;
  padding: 5px;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;

  ${({ open }) =>
    open
      ? css`
          color: black;
          background-color: white;
        `
      : css`
          color: white;
          background-color: black;
        `};
`;

const Title = styled.h2`
  text-align: center;
  margin: 5px;
  cursor: pointer;
`;

const Content = styled.div`
  display: ${({ open }) => (open ? "bloc" : "none")};
`;

const Debug = ({ async }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <Container open={open}>
      <Title onClick={toggle}>Debug {open ? "↓" : "↑"}</Title>
      <Content open={open}>
        <SyncAsync async={async} />
        <Latency />
      </Content>
    </Container>
  );
};

export default Debug;
