import React, { Suspense } from "react";
import styled from "styled-components";

import ArenaContent from "./arena-content";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Arena = ({ match }) => (
  <Container>
    <h1>Arena</h1>
    <Suspense fallback={<div>Loading</div>}>
      <ArenaContent match={match} />
    </Suspense>
  </Container>
);
export default Arena;
