const express = require('express');
const ProductsService = require('./../services/productsServices');

const validatorHandler = require('./../middleware/validatorHandler');

const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/productSchema');
const service = new ProductsService();

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});
//Los endpoints especificos deben declararsen antes de los endpoints dinamicos.

router.get('/filter', (req, res) => {
  res.send('soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json({
      newProduct,
    });
  },
);

router.patch(
  '/:id',

  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(200).json({
        product,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const del = await service.delete(id);
  res.json({
    del,
  });
});

module.exports = router;
