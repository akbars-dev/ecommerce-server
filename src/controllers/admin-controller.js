const adminService = require('../service/admin-service.js');


class AdminController {
    async create(req, res, next) {
        try {
            const { adminName, password, role } = req.body;
            const data = await adminService.createAdmin(adminName, password, role);
        
            return res.json({ status: 201, message: 'Yangi admin yaratildi', data: data })
        } catch {
            next(e)
        }
    }
    async update (req, res, next) {
            try {
                const data = await adminService.updateAdmin(req.params.id, req.body);
                return res.json({ status: 200, message: 'admin yangilandi', data: data });
            } catch (e) {
                next(e)
            }
        }
        
    async delete(req, res, next) {
            try {
                const data = await adminService.deleteAdmin(req.params.id);
                return res.json({ status: 200, message: 'Admin ochirildi', data: data });
            } catch (e) {
                next(e)
            }
        }
    
    async all (req, res, next) {
        try {
            const data = await adminService.getAdmins();
            return res.json({status: 200, message: 'Barcha adminlar', data: data});
        } catch (e) {
            next(e)
        }
    }
    
    
}


module.exports = new AdminController();