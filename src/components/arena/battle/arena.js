import React, { Suspense } from "react";
import styled from "styled-components";
import Loader from "../../design-system/loader";
import BackButton from "../../design-system/back-button";

import ArenaContent from "./battle";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  width: 100%;

  background: url("/selector-background.svg");
  background-repeat: repeat;
  background-size: 100px;
`;

// const LoaderContainer = styled.div`
//   margin-top: 10vh;
//   width: 20rem;
//   height: 20rem;
// `;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  padding: 14px;
`;

const Arena = ({ match }) => (
  <Container>
    <BackButton to="/arena/choice" />
    <Title>Arena</Title>
    <Suspense fallback={<Loader />}>
      <ArenaContent match={match} />
    </Suspense>
  </Container>
);
export default Arena;
