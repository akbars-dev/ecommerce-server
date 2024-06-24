const ApiError = require("../errors/api-error");
const adminModel = require("../models/admin-model");
const tokenService = require("./token-service");


class AuthService {
    async login(adminName, password) {
        const condidation = await adminModel.findOne({ adminName });
        if (!condidation) throw ApiError.BadRequest('ADMIN topilmadi');
        if (condidation.password != password) throw ApiError.BadRequest('Admin topilmadi');

        const tokens = tokenService.generateTokens({ id: condidation._id, adminName: condidation.adminName, role: condidation.role });

        await tokenService.saveToken(condidation._id, tokens.refreshToken);

        return { ...tokens, admin: condidation }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
  
    async refresh(refreshToken) {
        console.log(refreshToken);
        if (!refreshToken) {
            console.log('sss123');
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        console.log('userData:', userData);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        console.log(tokenFromDb);
        if (!userData || !tokenFromDb) {
            console.log('sss');
            throw ApiError.UnauthorizedError();
        }
        const admin = await adminModel.findById(userData.id);
        console.log('admin', admin);
        const tokens = tokenService.generateTokens({ id: admin.id, adminName: admin.adminName, role: admin.role });

        await tokenService.saveToken(admin._id, tokens.refreshToken);
        return { ...tokens, admin: admin }
    }
}


module.exports = new AuthService();