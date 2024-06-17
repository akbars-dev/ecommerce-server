const {Router} = require('express');
const subCategoriesController = require('../controllers/subCategories-controller');

const subCategoryRouter = Router();


subCategoryRouter.get('/all', subCategoriesController.all);
subCategoryRouter.get('/get/:id', subCategoriesController.get);
subCategoryRouter.post('/create', subCategoriesController.create);
subCategoryRouter.put('/update/:id', subCategoriesController.update);
subCategoryRouter.delete('/delete/:id', subCategoriesController.delete)


module.exports = subCategoryRouter;