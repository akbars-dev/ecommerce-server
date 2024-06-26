const { Router } = require('express'); 
const historiesController = require('../controllers/histories-controller.js');


const historiesRouter = Router():


historiesRouter.get('/all', historiesController.all);


module.exports = historiesRouter;