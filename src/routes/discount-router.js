const { Router } = require('express');
const discountController = require('../controllers/discount-controller');
const multerUtil = require('../utils/multer-util')

const discountRouter = Router();


discountRouter.post('/create', multerUtil.single('photo') ,discountController.create);
discountRouter.put('/update/:id', discountController.update);
discountRouter.delete('/delete/:id', discountController.delete);
discountRouter.get('/all', discountController.all);


module.exports = discountRouter;