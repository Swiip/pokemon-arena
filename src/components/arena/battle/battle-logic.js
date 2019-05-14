import { timeout } from "../../../utils";

const { floor, random } = Math;

const getStat = (statName, data) =>
  data.stats.find(stat => stat.stat.name === statName).base_stat;

const initialStatePokemon = data => {
  const hp = getStat("hp", data);
  return {
    name: data.name,
    xp: data.base_experience,
    hp: { init: hp , current: hp },
    attack: getStat("attack", data),
    defense: getStat("defense", data),
    moves: data.moves
  };
};

export const initialState = data => ({
  first: initialStatePokemon(data[0]),
  second: initialStatePokemon(data[1]),
  turn: 0,
  logs: [],
  winner: null
});

export const reducer = (state, action) => {
  switch (action.type) {
    case "move":
      const { attacker, defender, defenderPosition, move } = action;
      let winner = null;
      // https://www.dragonflycave.com/mechanics/battle
      const damage =
        floor(
          floor(
            (floor((2 * attacker.xp) / 5 + 2) * attacker.attack * move.power) /
              defender.defense
          ) /
            (50 /* cheat to get combat longer --> */ * 8)
        ) + 2;
      defender.hp.current -= damage;
      if (defender.hp.current < 0) {
        defender.hp.current = 0;
      }
      let logs = [
        {
          type: 'attack',
          attackerName: attacker.name,
          move: move.name,
          damage
        },
        ...state.logs
      ];

      if (defender.hp.current === 0) {
        winner = attacker;
        logs = [{
          type: 'win',
          name: attacker.name,
        }, ...state.logs];
      }

      return {
        ...state,
        [defenderPosition]: { ...defender },
        turn: state.turn + 1,
        logs: logs,
        winner
      };
    default:
      return state;
  }
};

const move = async (state, dispatch) => {
  await timeout(2000);
  const attacker = state.turn % 2 === 0 ? state.first : state.second;
  const defender = state.turn % 2 === 0 ? state.second : state.first;
  const defenderPosition = state.turn % 2 === 0 ? "second" : "first";
  const move = attacker.moves[floor(random() * attacker.moves.length)];
  dispatch({ type: "move", attacker, defender, defenderPosition, move });
};

export const fight = (state, dispatch) => {
  if (state.first.hp.current > 0 && state.second.hp.current > 0) {
    move(state, dispatch);
  }
};
