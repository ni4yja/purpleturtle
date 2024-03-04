import Koa from 'koa';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initAgent } from './agent/index.js';

const app = new Koa();

// Initialize agent
initAgent().catch(console.error);

// Middleware
app.use(errorHandler);

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
