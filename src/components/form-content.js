import React, { useState } from "react";
import { unstable_createResource as createResource } from "react-cache";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  width: 100%;
`;
const FieldContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
`;

const Fieldset = styled.fieldset`
  height: 80vh;
  flex: 1;
  border: 1px solid #444;
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
  margin-bottom: 2rem;
`;

const FightButton = styled.button`
  font-family: "Pokemon";
  position: fixed;
  border: 2px solid hsl(60, 100%, 49%);
  background-color: rgb(0, 149, 216);
  color: hsl(60, 100%, 49%);
  width: 150px;
  left: 50%;
  margin-left: -75px;
  height: 150px;
  top: 50%;
  margin-top: -75px;
  font-size: 1.5rem;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  &:hover {
    background-color: hsl(190, 100%, 40%);
  }
  &[disabled] {
    padding: 5px;
    background-color: grey;
  }
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
    display: block;
  }

  & input:checked + label {
    font-weight: bold;
  }
`;

const PokemonListItem = styled.div`
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  width: 140px;
  height: 140px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 96px;
  height: 96px;
`;

const timeout = duration =>
  new Promise(resolve => setTimeout(resolve, duration));

const fetchApi = async () => {
  await timeout(1000);
  const response = await fetch(`http://localhost:4200/pokemons`);
  const result = await response.json();
  return result;
};

const ApiResource = createResource(fetchApi);

const useField = () => {
  const [value, setter] = useState();
  const changeHandler = event => setter(event.target.value);
  return [value, changeHandler];
};

const FormContent = ({ history }) => {
  const result = ApiResource.read();

  const [first, handleFirst] = useField();
  const [second, handleSecond] = useField();

  const onSubmit = event => {
    event.preventDefault();

    if (first && second) {
      history.push(`/arena/${first}/${second}`);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FieldContainer>
        <Fieldset>
          <Legend>First fighter</Legend>
          <PokemonListContainer>
            {result.map((pokemon, index) => (
              <PokemonListItem key={pokemon.name}>
                <input
                  type="radio"
                  onChange={handleFirst}
                  id={`oponent1-${pokemon.name}`}
                  value={pokemon.name}
                  name="oponent1"
                />
                <label htmlFor={`oponent1-${pokemon.name}`}>
                  <Img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
                      1}.png`}
                  />
                  {pokemon.name}
                </label>
              </PokemonListItem>
            ))}
          </PokemonListContainer>
        </Fieldset>
        <Fieldset>
          <Legend>Second fighter</Legend>
          <PokemonListContainer>
            {result.map((pokemon, index) => (
              <PokemonListItem key={pokemon.name}>
                <input
                  type="radio"
                  onChange={handleSecond}
                  id={`oponent2-${pokemon.name}`}
                  value={pokemon.name}
                  name="oponent2"
                />
                <label htmlFor={`oponent2-${pokemon.name}`}>
                  <Img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
                      1}.png`}
                    alt={pokemon.name}
                  />
                  {pokemon.name}
                </label>
              </PokemonListItem>
            ))}
          </PokemonListContainer>
        </Fieldset>
      </FieldContainer>
      <FightButton type="submit" disabled={!first || !second}>
        Fight!
      </FightButton>
    </Form>
  );
};

export default FormContent;
