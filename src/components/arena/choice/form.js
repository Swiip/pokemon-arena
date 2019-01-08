import React, { Suspense } from "react";
import styled from "styled-components";
import Loader from '../../loader';
import BackButton from '../../back-button';


import FormContent from "./form-content";

const Container = styled.div`
  background: url("/selector-background.svg");
  background-repeat: repeat;
  background-size: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoaderContainer = styled.div`
  margin-top: 10vh;
  width: 20rem;
  height: 20rem;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  padding: 14px;
`;

const Form = ({ history }) => (
  <Container>
    <BackButton to="/" />
    <Title>Choose your pokemons</Title>
    <Suspense fallback={<LoaderContainer><Loader/></LoaderContainer>}>
      <FormContent history={history} />
    </Suspense>
  </Container>
);
export default Form;
