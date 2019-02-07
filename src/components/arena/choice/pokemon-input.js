import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 96px;
  height: 96px;
`;

const PokemonInput = ({ pokemon, name, onChange }) => (
  <>
    <input
      type="radio"
      onChange={onChange}
      id={`${name}-${pokemon.name}`}
      value={pokemon.name}
      name={name}
    />
    <label htmlFor={`${name}-${pokemon.name}`}>
      <Img
        src={`/api/img/black-white/${pokemon.name}.png`}
        alt={pokemon.name}
      />
      {pokemon.name}
    </label>
  </>
);

export default PokemonInput;
