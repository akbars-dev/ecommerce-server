const { Router } = require('express');
const productController = require('../controllers/product-controller');
const multerUtil = require('../utils/multer-util');

const productRouter = Router();

productRouter.get('/all', productController.all);
productRouter.get('/get/:id', productController.get);
productRouter.post('/create', multerUtil.single('photo'), productController.create);
productRouter.put('/update/:id', multerUtil.single('photo'), productController.update);
productRouter.delete('/delete/:id', productController.delete);


module.exports = productRouter;