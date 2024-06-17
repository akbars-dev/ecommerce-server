const { Router } = require('express');
const multerUtil = require('../utils/multer-util');
const usersController = require('../controllers/users-controller');


const userRouter = Router();

userRouter.post('/create', multerUtil.single('photo'), usersController.create);
userRouter.put('/cashback/action/:id', usersController.cashbackAction);
userRouter.get('/search', usersController.search);



module.exports = userRouter;