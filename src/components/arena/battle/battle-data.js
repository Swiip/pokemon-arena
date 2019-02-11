import { unstable_createResource as createResource } from "../../../vendor/react-cache.development";

const fetchApi = async path => {
  const response = await fetch(`http://localhost:4200/${path}`);
  const result = await response.json();
  return result;
};

const ApiResource = createResource(fetchApi);

export const loadData = ({ first, second }) => {
  // get pokemon data
  const data = [
    ApiResource.read(`pokemons/${first}`),
    ApiResource.read(`pokemons/${second}`)
  ];

  return data;
};
