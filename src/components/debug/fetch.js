import {timeout} from '../../utils';

export const fetchDebug = (...args) => {
  return timeout(localStorage.getItem('latency') || 1000)
    .then(() => fetch(...args));
}
