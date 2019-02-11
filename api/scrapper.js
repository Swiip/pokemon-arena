const path = require("path");
const fs = require("fs-extra");
const axios = require("axios");
const { mapSeries } = require("bluebird");

const dataAPI = `https://pokeapi.co/api/v2`;
const gifAPI = `http://www.pokestadium.com/sprites`;

const getGif = async gifPath => {
  const options = {
    headers: { Accept: "image/gif" },
    responseType: "stream"
  };

  try {
    const response = await axios.get(`${gifAPI}/${gifPath}`, options);

    await response.data.pipe(
      fs.createWriteStream(path.join(__dirname, `./data/img/${gifPath}`))
    );

    console.log(`${gifPath} scrapped`);
  } catch (error) {
    console.log(`${gifPath} NOT scrapped, DO NOT USE THIS POKEMON`);
    throw error;
  }
};

const movesCache = {};

const getData = async pokemonName => {
  try {
    const response = await axios.get(`${dataAPI}/pokemon/${pokemonName}`);
    const pokemon = response.data;

    pokemon.moves = await mapSeries(pokemon.moves, async data => {
      try {
        if (movesCache[data.move.name]) {
          return movesCache[data.move.name];
        }
        const response = await axios.get(`${dataAPI}/move/${data.move.name}`);
        const move = { name: response.data.name, power: response.data.power };
        movesCache[data.move.name] = move;
        return move;
      } catch (e) {
        console.log("load move", data.move.name, "failed, skipping", e);
        return null;
      }
    });

    await fs.writeFile(
      path.join(__dirname, `./data/pokemon/${pokemonName}.json`),
      JSON.stringify(pokemon)
    );

    console.log(`${pokemonName} data scrapped`);
  } catch (error) {
    console.log("load data failed", error);
    console.log(`${pokemonName} data NOT scrapped, DO NOT USE THIS POKEMON`);
    throw error;
  }
};

async function scrap() {
  // Create necessary directories
  await fs.ensureDir(path.join(__dirname, "./data/img/xy/back"));
  await fs.ensureDir(path.join(__dirname, "./data/img/black-white"));
  await fs.ensureDir(path.join(__dirname, "./data/pokemon"));

  // get and write pokemons list
  const resPokemon = await axios.get(`${dataAPI}/pokemon?limit=-1`);

  const pokemons = await mapSeries(resPokemon.data.results, async pokemon => {
    let ok = true;
    try {
      await getGif(`xy/${pokemon.name}.gif`);
      await getGif(`xy/back/${pokemon.name}.gif`);
      await getGif(`black-white/${pokemon.name}.png`);
      await getData(pokemon.name);
    } catch (error) {
      ok = false;
    } finally {
      return { ...pokemon, ok };
    }
  }).filter(pokemon => pokemon.ok);

  await fs.writeFile(
    path.join(__dirname, "./data/pokemons.json"),
    JSON.stringify(pokemons)
  );
}

scrap()
  .then(() => console.log("Job finished !"))
  .catch(err => console.error(err.message));
