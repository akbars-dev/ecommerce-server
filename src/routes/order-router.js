const { Router } = require('express');
const orderController = require('../controllers/order-controller');

const orderRouter = Router();


orderRouter.post('/create', orderController.create);
orderRouter.get('/get-author/:id', orderController.getByAuthor);
orderRouter.get('/all', orderController.all)
orderRouter.get('/get/:id', orderController.get)


module.exports = orderRouter;