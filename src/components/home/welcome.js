import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-family: "Pokemon";
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  background: url("/selector-background.svg");
  background-repeat: repeat;
  background-size: 100px;
`;

const Title = styled.h1`
  color: black;
  text-align: center;
  font-size: 3rem;
  padding: 14px;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Button = styled(Link)`
  padding: 1rem;
  margin: 1vh;

  background-color: black;
  color: white;
  font-size: 20px;
  text-decoration: none;

  width: 10vw;

  border-radius: 20px;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #ffffff;
  position: relative;
  top: -3rem;
`;

const Welcome = () => (
  <Container>
    <Title>Pokemon</Title>
    <div>
      <Image src="/welcome.jpg" alt="Welcome" />
      <Subtitle>Welcome to the Pokemon Arena</Subtitle>
    </div>
    <Button to="/arena/choice">Go</Button>
    <Button to="/stats">Stats</Button>
  </Container>
);

export default Welcome;
