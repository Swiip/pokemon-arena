import React, { Suspense } from "react";
import styled from "styled-components";

import ArenaContent from "./battle";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  width: 100%;
  background-color: #12d881;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  padding: 14px;
`;

const Arena = ({ match }) => (
  <Container>
    <Title>Arena</Title>
    <Suspense fallback={<div>Loading</div>}>
      <ArenaContent match={match} />
    </Suspense>
  </Container>
);
export default Arena;
