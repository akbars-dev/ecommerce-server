const { Router } = require('express');
const authController = require('../controllers/auth-controller');

const authRouter = Router();


authRouter.post('/login', authController.login);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/logout', authController.logout);


module.exports = authRouter;