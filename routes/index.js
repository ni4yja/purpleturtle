import Router from '@koa/router';
import { profilesRouter } from './profiles.js';

const router = new Router();

router.use(
  '/profiles',
  profilesRouter.routes(),
  profilesRouter.allowedMethods(),
);

export { router };
