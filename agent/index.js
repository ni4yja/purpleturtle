import pkg from '@atproto/api';
import { SERVICE, IDENTIFIER, PASSWORD } from '../config/index.js';

const { BskyAgent } = pkg;

let agent = null;

async function initAgent() {
  if (!agent) {
    agent = new BskyAgent({ service: SERVICE });
    await agent.login({ identifier: IDENTIFIER, password: PASSWORD });
  }
  return agent;
}

export { initAgent };
