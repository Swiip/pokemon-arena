import { unstable_createResource as createResource } from "react-cache";

import { timeout } from "../../utils";

const fetchApi = async path => {
  await timeout(1000);
  const response = await fetch(`https://pokeapi.co/api/v2/${path}/`);
  const result = await response.json();
  return result;
};

const ApiResource = createResource(fetchApi);

export const loadData = ({ first, second }) => {
  // get pokemon data
  const data = [
    ApiResource.read(`pokemon/${first}`),
    ApiResource.read(`pokemon/${second}`)
  ];
  // reduce move list
  data.map(data => {
    data.moves = data.moves.slice(0, 3);
    return data;
  });
  console.log("data1", data);
  // get moves data
  data.map(data => {
    data.moves = data.moves.map(move =>
      move.move ? ApiResource.read(`move/${move.move.name}`) : move
    );
    return data;
  });

  return data;
};
