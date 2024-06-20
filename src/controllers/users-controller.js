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

    async update(req, res, next) {
        try {
            const { lang, telephone } = req.body;
            const data = await usersService.update(req.params.id, { lang, telephone });

            return res.json({ status: 200, message: "Xaridor yanglilandi", data: data })
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

    async getUser(req, res, next) {
        try {
            const data = await usersService.getUser(req.params.id);
            return res.json({ status: 200, message: "User topildi", data: data });
        } catch (error) {
            next(error)
        }
    }

    async getUserLang(req, res, next) {
        try {
            const data = await usersService.getUserLang(req.params.id);
            return res.json({ status: 200, message: "User tili", data: data });
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new UserController();