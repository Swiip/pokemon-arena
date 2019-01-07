import React, { Suspense } from "react";
import styled from "styled-components";

import FormContent from "./form-content";

const Container = styled.div`
  background: url("/selector-background.svg");
  height: 100vh;
  background-repeat: repeat;
  background-size: 100px;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  padding: 14px;
`;

const Form = ({ history }) => (
  <Container>
    <Title>Choose your pokemons</Title>
    <Suspense fallback={<div>Loading</div>}>
      <FormContent history={history} />
    </Suspense>
  </Container>
);
export default Form;
