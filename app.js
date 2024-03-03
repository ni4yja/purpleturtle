import Koa from 'koa';
import logger from 'koa-logger';
import Router from '@koa/router';
import pkg from '@atproto/api';
const { SERVICE, IDENTIFIER, PASSWORD } = process.env;

const app = new Koa();
const router = new Router();
const { BskyAgent } = pkg;

async function initAgent() {
  const agent = new BskyAgent({
    service: SERVICE,
  });
  await agent.login({
    identifier: IDENTIFIER,
    password: PASSWORD,
  });
}

initAgent().catch(console.error);

// middlewares
app.use(logger());

const helloWorld = (ctx) => {
  ctx.body = `Hello World!!! Hello Darkness`;
};

router.get('/', helloWorld);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
