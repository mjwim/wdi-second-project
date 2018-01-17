const { env } = require('../config/environment');

function errorHandler(err, req, res, next) {
  console.log('IN THE ERR HANDLER');
  console.log(err);
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  if(env !== 'production') delete err.stack;

  res.status(err.status);
  res.locals.err = err;

  res.render(`statics/${err.status}`);
  next(err);
}

module.exports = errorHandler;
