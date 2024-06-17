const usersService = require("../service/users-service");


class UserController {
    async create(req, res, next) {
        try {
            const { firstName, lastName, telephone, telegramId, lang, birthdayDate, barCode } = req.body;
            
            const data = await usersService.create(firstName, lastName, telephone, telegramId, lang, birthdayDate, barCode, req.file.filename);
            return res.json({ status: 201, message: "User yaratildi", data:data })
        } catch (error) {
            next(error)
        }
    }

    async search(req, res, next) {
        try {
            const q = req.query.q;
            const results = await usersService.search(q);

            return res.json({status: 200, message: "Izlagan malumotlaringiz", data: results})
        } catch (error) {
            next(error)
        }
    }

    async cashbackAction(req, res, next) {
        try {
            const { balance, type } = req.body;
            const data = await usersService.cashbackAction(req.params.id, balance, type);

            return res.json({ status: 200, message: "Cashback yangilandi", data: data });
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new UserController();