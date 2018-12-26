import React, { useState, Fragment } from "react";
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
  height: 40vh;
`;
const Legend = styled.legend`
  color: #fff;
  text-align: center;
`;

const FightButton = styled.button`
  border: 2px solid hsl(60, 100%, 49%);
  background-color: rgb(0, 149, 216);
  color:  hsl(60, 100%, 49%);
  width: 150px;
  font-size: 1.5rem;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;
  &:hover {
    background-color: hsl(190, 100%, 40%);
  }
  &[disabled] {
    padding: 5px;
    background-color: grey;
  }
`;

const PokemonListContainer = styled.div`
  overflow-x: scroll;
  height: 100%;

  & input {
    position: relative;
    left: -9000px;
  }
  & label {
    display: block;
  }

  & input:checked+label {
    font-weight: bold;
  }
`;

const timeout = duration =>
  new Promise(resolve => setTimeout(resolve, duration));

const fetchApi = async() => {
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

    if(first && second) {
      history.push(`/arena/${first}/${second}`);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FieldContainer>
        <Fieldset>
          <Legend>First oponent</Legend>
          <PokemonListContainer>
          {result.map(pokemon => (
            <Fragment key={pokemon.name}>
              <input type="radio" onChange={handleFirst} id={`oponent1-${pokemon.name}`} value={pokemon.name} name="oponent1" />
              <label htmlFor={`oponent1-${pokemon.name}`}>{pokemon.name}</label>
            </Fragment>
          ))}
          </PokemonListContainer>
        </Fieldset>
        <Fieldset>
          <Legend>Second oponent</Legend>
          <PokemonListContainer>
          {result.map(pokemon => (
            <Fragment key={pokemon.name}>
              <input type="radio" onChange={handleSecond} id={`oponent2-${pokemon.name}`} value={pokemon.name} name="oponent2" />
              <label htmlFor={`oponent2-${pokemon.name}`}>{pokemon.name}</label>
            </Fragment>
          ))}
          </PokemonListContainer>
        </Fieldset>
      </FieldContainer>
      <FightButton type="submit" disabled={!first || !second}>Fight!</FightButton>
    </Form>
  );
};

export default FormContent;
