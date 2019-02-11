import React from "react";
import styled from "styled-components";

import FighterField from "./fighter-field";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
`;

const FieldContainer = ({ pokemons, onFirst, onSecond }) => (
  <Container>
    <FighterField isFirst pokemons={pokemons} onChange={onFirst} />
    <FighterField pokemons={pokemons} onChange={onSecond} />
  </Container>
);

export default FieldContainer;
