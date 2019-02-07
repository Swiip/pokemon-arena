import { unstable_createResource as createResource } from "../../../vendor/react-cache.development";
import {fetchDebug} from '../../debug/fetch';

const fetchApi = async pokemon => {
  const response = await fetchDebug(`/api/pokemon/${pokemon}.json`);
  const result = await response.json();
  return result;
};

const ApiResource = createResource(fetchApi);

export const loadData = ({ first, second }) => {
  // get pokemon data
  const data = [
    ApiResource.read(first),
    ApiResource.read(second)
  ];

  return data;
};
