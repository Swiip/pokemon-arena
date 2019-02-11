import React from "react";
import styled from "styled-components";

import PokemonInput from "./pokemon-input";

const Fieldset = styled.fieldset`
  height: 80vh;
  flex: 1;
  border: 1px solid #fff;
  border-radius: 3px;
  overflow-y: hidden;
  margin-left: 10px;
  margin-right: 10px;
`;

const Legend = styled.legend`
  color: #fff;
  text-align: center;
  font-family: "Pokemon";
  font-size: 2em;
  padding: 0.5rem;
`;

const PokemonListContainer = styled.div`
  height: 100%;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & input {
    position: relative;
    left: -9000px;
  }
  & label {
    &:hover {
      border: 2px solid rgba(255, 0, 0, 0.6);
      background-color: rgba(255, 255, 255, 0.6);
    }
    width: 140px;
    height: 140px;
    cursor: pointer;
    text-align: center;
    border-radius: 8px;
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }

  & input:checked + label {
    border: 2px solid red;
    background-color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
  }
`;

const FighterField = ({ isFirst, pokemons, onChange }) => {
  const legend = `${isFirst ? "First" : "Second"} fighter`;
  const name = `opponent-${isFirst ? "first" : "second"}`;

  return (
    <Fieldset>
      <Legend>{legend}</Legend>
      <PokemonListContainer>
        {pokemons.map((pokemon, index) => (
          <PokemonInput
            key={pokemon.name}
            pokemon={pokemon}
            name={name}
            onChange={onChange}
          />
        ))}
      </PokemonListContainer>
    </Fieldset>
  );
};

export default FighterField;
