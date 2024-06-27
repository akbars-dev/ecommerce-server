const { Router } = require('express');
const categoryRouter = require('./category-router');
const subCategoryRouter = require('./subCategory-router');
const productRouter = require('./product-router');
const userRouter = require('./user-router');
const orderRouter = require('./order-router');
const authRouter = require('./auth-router');
const discountRouter = require('./discount-router');
const errorMiddleware = require('../middlewares/error-middleware');
const analiyticsRouter = require('./analiytics-router.js');
const historiesRouter = require('./histories-router.js');


const router = Router();


router.use('/categories', categoryRouter);
router.use('/sub-categories', subCategoryRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/order', orderRouter);
router.use('/discount', discountRouter);
router.use('/histories', historiesRouter);
router.use('/analiytics', analiyticsRouter);
router.use('/auth', authRouter);
router.use(errorMiddleware);

module.exports = router;