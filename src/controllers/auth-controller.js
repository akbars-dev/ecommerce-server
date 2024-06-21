const authService = require("../service/auth-service")


class AuthController {
    async login(req, res, next) {
        try {
            const { adminName, password } = req.body;
            const data = await authService.login(adminName, password);
            res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });


            return res.json({ status: 200, message: 'Admin Akkauntiga kirdi', data: data })
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const data = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json({ status: 200, message: 'Admin Akkauntidan chiqdi', data: data })
        } catch (error) {
            next(error)
        }
    }


    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const data = await authService.refresh(refreshToken);
            res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json({ status: 200, message: 'Admin akkaunti yangilandi chiqdi', data: data })
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();