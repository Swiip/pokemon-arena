import React, { useState } from "react";
import { unstable_createResource as createResource } from "react-cache";

const timeout = duration =>
  new Promise(resolve => setTimeout(resolve, duration));

const fetchApi = async path => {
  await timeout(1000);
  const response = await fetch(`https://pokeapi.co/api/v2${path}`);
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
  const result = ApiResource.read("/pokemon/");

  const [first, handleFirst] = useField();
  const [second, handleSecond] = useField();

  const onSubmit = event => {
    history.push(`/arena/${first}/${second}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>First oponent</legend>
        <select onChange={handleFirst}>
          {result.results.map(pokemon => (
            <option key={pokemon.name}>{pokemon.name}</option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <legend>Second oponent</legend>
        <select onChange={handleSecond}>
          {result.results.map(pokemon => (
            <option key={pokemon.name}>{pokemon.name}</option>
          ))}
        </select>
      </fieldset>
      <button>Fight!</button>
    </form>
  );
};

export default FormContent;
