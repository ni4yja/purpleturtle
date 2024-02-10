import Koa from 'koa';
import logger from 'koa-logger';
const router = require('@koa/router')();
import { BskyAgent } from '@atproto/api';

const app = new Koa();

// Initialize your agent inside an async function to use await
async function initAgent() {
  const agent = new BskyAgent({
    service: 'https://bsky.social',
  });
  await agent.login({
    identifier: '****',
    password: '****',
  });
  // further setup or operations using the agent
}

initAgent().catch(console.error);

// middlewares
app.use(logger());

const helloWorld = (ctx) => {
  ctx.body = 'Hello World!!! Hello Darknesss';
};

router.get('/', helloWorld);

app.use(router.routes());

app.listen(3000);
