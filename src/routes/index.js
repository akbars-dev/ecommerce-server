const { Router } = require('express');
const categoryRouter = require('./category-router');

const router = Router();


router.use('/categories', categoryRouter)


module.exports = router;