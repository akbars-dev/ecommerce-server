const {Router} = require('express');
const analiyticsController = require('../controllers/analiytics-controller.js');

const analiyticsRouter = Router();

analiyticsRouter.get('/top', analiyticsController.top);


module.exports = analiyticsRouter;