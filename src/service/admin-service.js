const adminModel = require('../models/admin-model.js');
const ApiError = require('../errors/api-error.js');


class AdminService {
    async createAdmin (adminName, password, role) {
        const condidation = await adminModel.findOne({adminName: adminName});
        if(condidation) throw ApiError.BadRequest('Bunday admin oldin yaratilgan');
        
        const admin = await adminModel.create({ adminName, password, role });
        return admin;
    }
    
    async updateAdmin(id, data) {
        const condidation = await adminModel.findByIdAndUpdate(id, data);
        if (!condidation) throw ApiError.BadRequest('Bunday admin oldin yaratilgan');
        
        return condidation;
    }
    
    async deleteAdmin(id) {
        const condidation = await adminModel.findByIdAndDelete(id);
        if (!condidation) throw ApiError.BadRequest('Admin topilmadi');
        
        return true
    }
    
    async getAdmins () {
        const admins = await adminModel.find({});
        return admins
    }
}

module.exports = new AdminService();