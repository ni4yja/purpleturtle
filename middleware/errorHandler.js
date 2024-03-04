function errorHandler(ctx, next) {
  return next().catch((err) => {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  });
}

export { errorHandler };
