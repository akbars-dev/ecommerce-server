const { Router } = require('express');
const categoryRouter = require('./category-router');
const subCategoryRouter = require('./subCategory-router');
const productRouter = require('./product-router');
const userRouter = require('./user-router');

const router = Router();


router.use('/categories', categoryRouter);
router.use('/sub-categories', subCategoryRouter)
router.use('/products', productRouter);
router.use('/users', userRouter)

module.exports = router;