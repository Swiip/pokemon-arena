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

const FightButton = styled.button`
  font-family: "Pokemon";
  font-size: 1.5rem;

  position: fixed;
  width: 150px;
  height: 150px;

  left: 50%;
  top: 50%;

  margin-left: -75px;
  margin-top: -75px;

  padding: 8px;

  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.24);
  cursor: pointer;

  border: 2px solid rgba(255, 0, 0, 0.9);
  background-color: rgba(255, 255, 255, 0.9);
  color: rgba(255, 0, 0, 0.8);

  transition: all 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    border: 3px solid rgba(255, 0, 0, 1);
    color: rgba(255, 0, 0, 1);
  }
  &[disabled] {
    filter: grayscale(100%);
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

const Img = styled.img`
  width: 96px;
  height: 96px;
`;

const fetchApi = async () => {
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
              <div key={pokemon.name}>
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
              </div>
            ))}
          </PokemonListContainer>
        </Fieldset>
        <Fieldset>
          <Legend>Second fighter</Legend>
          <PokemonListContainer>
            {result.map((pokemon, index) => (
              <div key={pokemon.name}>
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
              </div>
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
