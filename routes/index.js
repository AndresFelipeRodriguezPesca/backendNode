const express = require('express');
const productsRouter = require('./productsRouter');
//
function routerApi(app) {
  const router = express.Router();
  //generamos un path global
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  //router.use('/users', usersRouter);
  //router.use('/categories', categoriesRouter);
}
module.exports = routerApi;
