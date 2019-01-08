const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const util = require("util");
const path = require("path");
const { readFile } = require("fs-extra");
const { mapSeries } = require("bluebird");

const app = new Koa();
const router = new Router();

let debounceTime = 300;

const timeout = () => new Promise(resolve => setTimeout(resolve, debounceTime));

router.get("/pokemons", async ctx => {
  await timeout();
  ctx.set("Access-Control-Allow-Origin", `http://localhost:3000`);
  ctx.body = await readFile(
    path.join(__dirname, "./data/pokemons.json"),
    "utf8"
  );
});

router.get("/pokemons/stats", async ctx => {
  await timeout();
  ctx.set("Access-Control-Allow-Origin", `http://localhost:3000`);
  const pokemonListJson = await readFile(
    path.join(__dirname, "./data/pokemons.json"),
    "utf8"
  );
  const pokemonList = JSON.parse(pokemonListJson);
  const data = await mapSeries(pokemonList, async pokemon => {
    const json = await readFile(
      path.join(__dirname, `./data/pokemon/${pokemon.name}.json`),
      "utf8"
    );
    const pokemonData = JSON.parse(json);
    const result = {
      id: pokemonData.id,
      name: pokemonData.name
    };
    pokemonData.stats.forEach(stat => {
      result[stat.stat.name] = stat.base_stat;
    });
    console.log("Pokemon ready", result);
    return result;
  });
  ctx.body = JSON.stringify(data);
});

router.put("debounce-network", ctx => {
  debounceTime = ctx.req.body;
  ctx.status = 200;
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(path.join(__dirname, "./data/img/")));

app.listen(4200, () => {
  console.log("Server is listening on http://localhost:4200/");
});
