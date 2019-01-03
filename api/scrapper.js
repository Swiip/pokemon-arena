const path = require("path");
const fs = require("fs-extra");
const axios = require("axios");
const { mapSeries } = require("bluebird");

const dataAPI = `https://pokeapi.co/api/v2/pokemon`;
const gifAPI = `http://www.pokestadium.com/sprites/xy/`;

const getGif = async gifPath => {
  const options = {
    headers: { Accept: "image/gif" },
    responseType: "stream"
  };

  try {
    const response = await axios.get(`${gifAPI}${gifPath}.gif`, options);

    await response.data.pipe(
      fs.createWriteStream(path.join(__dirname, `./data/img/${gifPath}.gif`))
    );

    console.log(`${gifPath} gif scrapped`);
  } catch (error) {
    console.log(`${gifPath} gif NOT scrapped, DO NOT USE THIS POKEMON`);
    throw error;
  }
};

const getData = async pokemonName => {
  try {
    const response = await axios.get(`${dataAPI}/${pokemonName}`);

    await fs.writeFile(
      path.join(__dirname, `./data/pokemon/${pokemonName}.json`),
      JSON.stringify(response.data)
    );

    console.log(`${pokemonName} data scrapped`);
  } catch (error) {
    console.log(`${pokemonName} data NOT scrapped, DO NOT USE THIS POKEMON`);
    throw error;
  }
};

async function scrap() {
  // Create necessary files
  await fs.ensureDir(path.join(__dirname, "./data"));
  await fs.ensureDir(path.join(__dirname, "./data/img"));
  await fs.ensureDir(path.join(__dirname, "./data/img/back"));
  await fs.ensureDir(path.join(__dirname, "./data/pokemon"));

  // get and write pokemons list
  const resPokemon = await axios.get(dataAPI);

  const pokemons = await mapSeries(resPokemon.data.results, async pokemon => {
    let ok = true;
    try {
      await getGif(pokemon.name);
      await getGif(`back/${pokemon.name}`);
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
  .catch(err => console.error(err));
