import Router from '@koa/router';
import { initAgent } from '../agent/index.js';

let agent;

(async () => {
  agent = await initAgent();
})();

const router = new Router();

router.get('/:userId', async (ctx) => {
  try {
    const userId = ctx.params.userId;
    const { data } = await agent.getProfiles({
      actors: [`${userId}`],
    });
    if (data.profiles && data.profiles.length > 0) {
      ctx.body = data.profiles[0];
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Profile not found' };
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
});

router.get('/:userId/latest', async (ctx) => {
  try {
    const userId = ctx.params.userId;
    const { data } = await agent.getAuthorFeed({
      actor: `${userId}`,
      filter: 'posts_and_author_threads',
      limit: 1,
    });
    if (data.feed && data.feed.length > 0) {
      ctx.body = data.feed[0];
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Post not found' };
    }
  } catch (error) {
    console.error('Error fetching profile latest post:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
});

export { router as profilesRouter };
