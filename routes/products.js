const productsController = require('../controllers/products.controller');
var express = require('express');
var router = express.Router();

router.get('/:userId/products', productsController.getAll);

module.exports = router;
