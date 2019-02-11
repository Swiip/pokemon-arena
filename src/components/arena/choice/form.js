import React, { useState } from "react";
import { unstable_createResource as createResource } from "../../../vendor/react-cache.development";
import styled from "styled-components";

import FieldContainer from "./field-container";
import FightButton from "./fight-button";

const HtmlForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  width: 100%;
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

const Form = ({ history }) => {
  const pokemons = ApiResource.read();

  const [first, handleFirst] = useField();
  const [second, handleSecond] = useField();

  const onSubmit = event => {
    event.preventDefault();

    if (first && second) {
      history.push(`/arena/${first}/${second}`);
    }
  };

  return (
    <HtmlForm onSubmit={onSubmit}>
      <FieldContainer
        pokemons={pokemons}
        onFirst={handleFirst}
        onSecond={handleSecond}
      />
      <FightButton first={first} second={second} />
    </HtmlForm>
  );
};

export default Form;
