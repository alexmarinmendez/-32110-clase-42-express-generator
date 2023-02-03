var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid')

const products = [{id: '1', name: 'Laptop', price: 10}]

/* GET products listing. */
router.get('/', (req, res) => {
  res.json(products)
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  const product = products.find(prod => prod.id === id)
  if (!product) {
    next(createError(404));
    return
  }
  res.json(product)
})

router.post('/', (req, res) => {
  const { name, price } = req.body
  const newProduct = {
    id: uuid(),
    name,
    price: +price
  }
  products.push(newProduct)
  res.json(newProduct)
})

router.put('/:id', (req, res, next) => {
  const { params: { id }, body: { name, price }} = req
  const productIndex = products.findIndex(prod => prod.id === id)
  if (productIndex < 0) {
    next(createError(404));
    return
  }
  products[productIndex] = {
    id,
    name,
    price
  }
  res.json(products[productIndex])
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const productIndex = products.findIndex(prod => prod.id === id)
  if (productIndex < 0) {
    next(createError(404));
    return
  }
  products.splice(productIndex, 1)
  res.json(products)
})

module.exports = router;
