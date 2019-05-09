import React from "react";

import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis
} from "victory";

// http://localhost:4200/${datum.name}.gif
// http://www.pokestadium.com/sprites/black-white/${datum.name}.png
const PokemonPoint = ({ x, y, datum, name }) => (
  <image
    href={`http://localhost:4200/black-white/${datum.name}.png`}
    x={x}
    y={y}
    height="20px"
    width="20px"
  />
);

const Scatter = ({ data }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    domain={{ x: [0, 200], y: [0, 200] }}
  >
    <VictoryAxis label="Attack" />
    <VictoryAxis dependentAxis label="Defense" />
    <VictoryScatter data={data} dataComponent={<PokemonPoint />} />
  </VictoryChart>
);

export default Scatter;
