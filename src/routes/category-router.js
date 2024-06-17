const { Router } = require('express');
const categoriesController = require('../controllers/categories-controller');

const categoryRouter = Router();

categoryRouter.get('/all', categoriesController.all);
categoryRouter.get('/get/:id', categoriesController.get);

categoryRouter.post('/create/', categoriesController.create);
categoryRouter.put('/update/:id', categoriesController.update);
categoryRouter.delete('/delete/:id', categoriesController.delete);


module.exports = categoryRouter;