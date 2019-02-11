import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import Loader from "../design-system/loader";
import BackButton from "../design-system/back-button";

const Chart = lazy(() => import("./chart"));

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

const LoaderContainer = styled.div`
  margin-top: 10vh;
  width: 20rem;
  height: 20rem;
`;

const Stats = ({ async }) => (
  <Container>
    <BackButton to="/" />

    <Title>Statistics ({async ? "async" : "sync"})</Title>
    <Suspense
      fallback={
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      }
    >
      <Chart async={async} />
    </Suspense>
  </Container>
);

export default Stats;
