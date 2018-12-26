const Koa = require('koa');
var Router = require('koa-router');
const serve = require('koa-static');
const util = require('util');
const path = require('path');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

const app = new Koa();
var router = new Router();

let debounceTime = 300;

function timeout() {
  return new Promise((resolve) => {
    setTimeout(resolve, debounceTime);
  })
}

router.get('/pokemons', async(ctx) => {
  await timeout();
  ctx.set('Access-Control-Allow-Origin', `http://localhost:3000`);
  ctx.body = await readFile(path.join(__dirname, './data/pokemons.json'), 'utf8');
});

router.put('debounce-network', (ctx) => {
  debounceTime = ctx.req.body;
  ctx.status = 200;
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(path.join(__dirname, './data/img/')));

app.listen(4200, () => {
  console.log('Server is listening on http://localhost:4200/');
});
