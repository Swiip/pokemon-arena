import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
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
    <h1>Welcome to the Pokemon Arena</h1>
    <img src="/welcome.png" alt="Welcome" />
    <Button to="/form">Go</Button>
  </Container>
);

export default Welcome;
