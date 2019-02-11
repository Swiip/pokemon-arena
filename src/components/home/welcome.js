import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CommonPage from "../design-system/page";
import Title from "../design-system/title";

const Page = styled(CommonPage)`
  font-family: "Pokemon";
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
  <Page>
    <Title>Pokemon</Title>
    <div>
      <Image src="/welcome.jpg" alt="Welcome" />
      <Subtitle>Welcome to the Pokemon Arena</Subtitle>
    </div>
    <Button to="/arena/choice">Go</Button>
    <Button to="/stats">Stats</Button>
  </Page>
);

export default Welcome;
