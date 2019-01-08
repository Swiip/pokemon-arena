import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: yellow;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: black;
  text-align: center;
  font-size: 2.5rem;
  padding: 14px;
`;

const Button = styled(Link)`
  margin-top: 30px;
  padding: 10px;
  background-color: black;
  color: white;
  font-size: 20px;
  border: none;
  text-decoration: none;
`;

const Welcome = () => (
  <Container>
    <Title>Welcome to the Pokemon Arena</Title>
    <div>
      <img src="/welcome.jpg" alt="Welcome" />
    </div>
    <Button to="/form">Go</Button>
    <Button to="/stats">Stats</Button>
  </Container>
);

export default Welcome;
