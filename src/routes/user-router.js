const { Router } = require('express');
const multerUtil = require('../utils/multer-util');
const usersController = require('../controllers/users-controller');


const userRouter = Router();

userRouter.post('/create', multerUtil.single('photo'), usersController.create);
userRouter.get('/get/:id', usersController.getUser);
userRouter.get('/get-lang/:id', usersController.getUserLang);
userRouter.get('/get-tg/', usersController.getTelegramId);
userRouter.get('/get-tg-birthday/', usersController.getTelegramIdAndBithday);
userRouter.put('/update/:id', usersController.update);
userRouter.put('/cashback/action/:id', usersController.cashbackAction);
userRouter.get('/search', usersController.search);



module.exports = userRouter;