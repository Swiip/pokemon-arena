import React from "react";
import styled from "styled-components";

import Pokeball from "./pokeball";

const Container = styled.div`
  margin-top: 10vh;
  width: 20rem;
  height: 20rem;
`;

const Loader = () => (
  <Container>
    <Pokeball />
  </Container>
);

export default Loader;
