const {Router} = require('express');
const adminController =require('../controllers/admin-controller.js')

const adminRouter = Router();


adminRouter.post('/create', adminController.create);
adminRouter.put('/update/:id', adminController.update);
adminRouter.delete('/delete/:id', adminController.delete);
adminRouter.get('/all', adminController.all);


module.exports = adminRouter;