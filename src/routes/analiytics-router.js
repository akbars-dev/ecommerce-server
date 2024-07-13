const {Router} = require('express');
const analiyticsController = require('../controllers/analiytics-controller.js');

const analiyticsRouter = Router();

analiyticsRouter.get('/top', analiyticsController.top);
analiyticsRouter.get('/exel/users', analiyticsController.getUserExel);
analiyticsRouter.get('/excel/top-costumers', analiyticsController.getTopCostumersExcel);
analiyticsRouter.get('/excel/top-products', analiyticsController.getTopProductsExcel);



module.exports = analiyticsRouter;