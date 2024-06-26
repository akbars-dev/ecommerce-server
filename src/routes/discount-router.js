const { Router } = require('express');
const discountController = require('../controllers/discount-controller');
const multerUtil = require('../utils/multer-util')

const discountRouter = Router();


discountRouter.post('/create', multerUtil.single('photo') ,discountController.create);
discountRouter.post('/update/:id', multerUtil.single('photo'), discountController.update);
discountRouter.delete('/delete/:id', discountController.delete);
discountRouter.get('/all', discountController.all);
discountRouter.get('/get/:id', discountController.get);


module.exports = discountRouter;