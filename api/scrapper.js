const axios = require('axios');
const dataAPI = `https://pokeapi.co/api/v2/pokemon`;
const gifAPI = `http://www.pokestadium.com/sprites/xy/`;

const path = require('path');
const util = require('util');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

async function ensureDir(path) {
  const exist = await exists(path);

  if(!exist) {
    console.log(`Creating folder ${path}`);
    return mkdir(path);
  }
}

async function scrap() {
  // Create necessary files
  await ensureDir(path.join(__dirname, './data'));
  await ensureDir(path.join(__dirname, './data/img'));

  // get and write pokemons list
  const resPokemon = await axios.get(dataAPI);

  const pokemons = resPokemon.data.results;

  await writeFile(
    path.join(__dirname, './data/pokemons.json'),
    JSON.stringify(pokemons)
  );

  for(let pokemon of pokemons) {
    await axios.get(`${gifAPI}${pokemon.name}.gif`, {
      headers: {
        Accept: 'image/gif',
      },
      responseType:'stream'
    })
      .then((response) => response.data
        .pipe(fs.createWriteStream(path.join(__dirname, `./data/img/${pokemon.name}.gif`)))
      )
      .then(() => console.log(`${pokemon.name} gif scrapped`))
      .catch(() => console.log(`${pokemon.name} gif NOT scrapped, DO NOT USE THIS POKEMON`));
  }
}

scrap()
  .then(() => console.log('Job finished !'))
  .catch((err) => console.error(err));
