import React, { useMemo, useState, Suspense } from "react";
import styled from "styled-components";
import {fetchDebug} from '../debug/fetch';

import Loader from "../design-system/loader";
import { unstable_createResource as createResource } from "../../vendor/react-cache.development";

import Input from "./input";
import Scatter from "./scatter";

const fetchApi = async () => {
  const response = await fetchDebug(`/api/pokemons.stats.json`);
  const result = await response.json();
  return result;
};

const ApiResource = createResource(fetchApi);

const Container = styled.div`
  max-width: 600px;
  min-height: 400px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Chart = ({ async }) => {
  const pokemonData = ApiResource.read();
  const chartData = useMemo(
    () =>
      pokemonData.map(data => ({
        x: data.attack,
        y: data.defense,
        z: data.speed,
        name: data.name
      })),
    [pokemonData]
  );
  const [count, setCount] = useState(0);
  const data = chartData.slice(0, count);

  return (
    <Container>
      <Input async={async} onChange={setCount} />
      <Scatter data={data} />
    </Container>
  );
};

const SuspenseBuffer = ({async}) => 
  <Suspense fallback={<Loader />}>
    <Chart async={async} />
  </Suspense>

export default SuspenseBuffer;
