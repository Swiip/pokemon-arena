import React, { Suspense, lazy } from "react";
import styled from "styled-components";

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

const Stats = ({ async }) => (
  <Container>
    <Title>Statistics ({async ? "async" : "sync"})</Title>
    <Suspense fallback={<div>Loading</div>}>
      <Chart async={async} />
    </Suspense>
  </Container>
);

export default Stats;
