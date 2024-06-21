const ApiError = require('../errors/api-error');
const cashbackModel = require('../models/cashback-model');
const userModel = require('../models/user-model');



class UserService {
    async create(firstName, lastName, telephone, telegramId, lang, birthdayDate, barCode, photoPath) {
        const condidation = await userModel.findOne({ telegramId: telegramId });
        if (condidation) throw ApiError.BadRequest('Bunday foydalanuvchi oldin yaratilgan.');
        const cashback = await cashbackModel.create({ barCode, photoPath });
        const user = await userModel.create({ firstName, lastName, telephone, telegramId, lang, birthdayDate, cashback: cashback._id });

        return { user, cashback }
    }

    async update(id, data) {
        const condidation = await userModel.findOneAndUpdate({ telegramId: id }, data, { new: true });
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritilgan');

        return condidation
    }

    async getAllBarcodes() {
        const barcodes = await userModel.find({}).select('barCode');
        return barcodes
    }

    async all(page, limit) {
        if (!page || !limit) {
            const users = await userModel.find({});
            return users;
        }
        const users = await userModel.find({}).skip((page || 1 - 1) * limit).limit(limit || 10);
        return users;
    }

    async search(query) {
        if (query.length == 0) throw ApiError.BadRequest('Query ichida malumot yoq')
        const regexQuery = { $regex: query, $options: 'i' };

        const results = await userModel.aggregate([
            {
                $lookup: {
                    from: 'cashbacks', // the name of the cashback collection
                    localField: 'cashback',
                    foreignField: '_id',
                    as: 'cashbackDetails'
                }
            },
            {
                $unwind: '$cashbackDetails'
            },
            {
                $match: {
                    $or: [
                        { firstName: regexQuery },
                        { lastName: regexQuery },
                        { telephone: regexQuery },
                        { 'cashbackDetails.barCode': regexQuery }
                    ]
                }
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    telephone: 1,
                    telegramId: 1,
                    lang: 1,
                    birthdayDate: 1,
                    orders: 1,
                    cashback: '$cashbackDetails' // include the joined cashback details
                }
            }
        ]);

        return results;
    }

    async cashbackAction(id, balance, type) {
        const user = await userModel.findById(id);
        const cashback = await cashbackModel.findById(user.cashback);
        if (type == "plus") {
            cashback.balance += balance;
            await cashback.save();
            return cashback;
        } else if (type == "minus") {
            cashback.balance -= balance;
            await cashback.save();
            return cashback;
        }
    }

    async getUser(userId) {
        const user = await userModel.findOne({ telegramId: userId }).populate('cashback');
        if (!user) throw ApiError.BadRequest('User topilmadi');

        return { firstName: user.firstName, lastName: user.lastName, barCode: user.cashback.barCode, cashbackBall: user.cashback.balance };
    }

    async getUserLang(userId) {
        const user = await userModel.findOne({ telegramId: userId });
        if (!user) throw ApiError.BadRequest('User topilmadi');

        return user.lang;
    }

    async getTelegramId() {
        const usersTelegramID = await userModel.find().select('telegramId');
        return usersTelegramID
    }

    async getTelegramIdAndBithday() {
        const users = await userModel.find().select('telegramId').select('birthdayDate').select('firstName').select('lastName');
        return users
    }

    async checkUser(telegramId) {
        const user = await userModel.findOne({ telegramId });
        if (!user) return false
        else return true
    }

}


module.exports = new UserService();