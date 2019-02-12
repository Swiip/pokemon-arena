import React, { Component } from "react";
import {fetchDebug} from '../../debug/fetch';
// import { unstable_createResource as createResource } from "../../../vendor/react-cache.development";
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
  const response = await fetchDebug(`/api/pokemons.json`);
  const result = await response.json();
  return result.results;
};

// const ApiResource = createResource(fetchApi);

// const useField = () => {
//   const [value, setter] = useState();
//   const changeHandler = event => setter(event.target.value);
//   return [value, changeHandler];
// };

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirst = this.handleFirst.bind(this);
    this.handleSecond = this.handleSecond.bind(this);

    this.state = { pokemons: [], first: null, second: null };
  }

  async componentDidMount() {
    const pokemons = await fetchApi();
    this.setState({ pokemons });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.first && this.state.second) {
      this.props.history.push(
        `/arena/${this.state.first}/${this.state.second}`
      );
    }
  }

  handleFirst(event) {
    this.setState({ first: event.target.value });
  }

  handleSecond(event) {
    this.setState({ second: event.target.value });
  }

  render() {
    return (
      <HtmlForm onSubmit={this.handleSubmit}>
        <FieldContainer
          pokemons={this.state.pokemons}
          onFirst={this.handleFirst}
          onSecond={this.handleSecond}
        />
        <FightButton first={this.state.first} second={this.state.second} />
      </HtmlForm>
    );
  }
}

export default Form;
