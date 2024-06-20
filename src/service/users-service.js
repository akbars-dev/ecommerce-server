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

    async all(page, limit) {
        const users = await userModel.find({}).skip((page - 1) * limit).limit(limit);
        return users;
    }

    async search(query) {
        if (query.length==0) throw ApiError.BadRequest('Query ichida malumot yoq')
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
        const user = await userModel.findById(userId);
        if (!user) throw ApiError.BadRequest('User topilmadi');

        return user;
    }

}


module.exports = new UserService();