const ApiError = require("../errors/api-error");
const usersService = require("../service/users-service");


class UserController {
    async create(req, res, next) {
        try {
            const { firstName, lastName, telephone, telegramId, lang, birthdayDate, barCode } = req.body;

            const data = await usersService.create(firstName, lastName, telephone, telegramId, lang, birthdayDate, barCode, req.file.filename);
            return res.json({ status: 201, message: "User yaratildi", data: data })
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { lang, telephone, birthdayDate } = req.body;
            const data = await usersService.update(req.params.id, { lang, telephone, birthdayDate });

            return res.json({ status: 200, message: "Xaridor yanglilandi", data: data })
        } catch (error) {
            next(error)
        }
    }

    async search(req, res, next) {
        try {
            const q = req.query.q;
            const results = await usersService.search(q);

            return res.json({ status: 200, message: "Izlagan malumotlaringiz", data: results })
        } catch (error) {
            next(error)
        }
    }

    async cashbackAction(req, res, next) {
        try {
            const { balance, type, userId } = req.body;
            const adminId = await req.params.id;

            if(!adminId) throw ApiError.UnauthorizedError();

            const data = await usersService.cashbackAction(userId, balance, type, adminId);

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

    async all(req, res, next) {
        try {
            const data = await usersService.all();
            return res.json({ status: 200, message: "Userlar topildi", data: data });
        } catch (error) {
            next(error)
        }
    }

    async getUserByTelegramId(req, res, next) {
        try {
            const data = await usersService.getUserByTelegram(req.params.id);
            return res.json({ status: 200, message: "User topildi", data: data });
        } catch (error) {
            next(error);
        }
    }

    async getAllBarcodes(req, res, next) {
        try {
            const data = await usersService.getAllBarcodes();
            return res.json({ status: 200, message: "Barcha keshbeklar", data: data })
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

    async getTelegramId(req, res, next) {
        try {
            const data = await usersService.getTelegramId();
            return res.json({ status: 200, message: 'Telegram aydilar', data: data });
        } catch (error) {
            next(error)
        }
    }

    async getTelegramIdAndBithday(req, res, next) {
        try {
            const data = await usersService.getTelegramIdAndBithday();
            return res.json({ status: 200, message: 'Telegram aydi va sanalar', data: data });
        } catch (error) {
            next(error)
        }
    }
    async checkUser(req, res, next) {
        try {
            const data = await usersService.checkUser(req.params.id);
            return res.json({ status: 200, message: 'Foydalanuvchi tekshirildi', data: data });
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new UserController();