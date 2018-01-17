function customResponses(req, res, next) {

  res.notFound = function notFound() {
    console.log('in notFound');
    const err = new Error('notFound');
    err.status = 404;
    throw err;
  };

  res.badRequest = function badRequest(url, error) {
    req.flash('alert', error);
    return res.redirect(url);
  };
  console.log(next);
  next();
}

module.exports = customResponses;
