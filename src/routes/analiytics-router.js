const {Router} = require('express');
const analiyticsController = require('../controllers/analiytics-controller.js');

const analiyticsRouter = Router();

analiyticsRouter.get('/top', analiyticsController.top);
analiyticsRouter.get('/exel/users', analiyticsController.getUserExel);


module.exports = analiyticsRouter;