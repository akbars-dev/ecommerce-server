const ApiError = require('../errors/api-error');
const cashbackModel = require('../models/cashback-model');
const historyModel = require('../models/history-model');
const userModel = require('../models/user-model');
const adminModel = require('../models/admin-model.js');
const axios = require('axios');
const timeUtil = require('../utils/time-util.js')
const { validateAccessToken } = require('./token-service');



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
            const users = await userModel.find({}).populate('cashback');
            return users;
        }
        const users = await userModel.find({}).skip((page || 1 - 1) * limit).limit(limit || 10).populate('cashback');
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

    async cashbackAction(id, balance, type, adminId, precent = 0) {
        const user = await userModel.findById(id);
        const cashback = await cashbackModel.findById(user.cashback);
        const admin = await adminModel.findById(adminId);

        const token = '7340703350:AAEb4Pc_aKsndM4kTE63O1pWzFZx_nBLlvY';

        console.log('admin', admin)
        if (!admin) throw ApiError.UnauthorizedError();
        console.log(admin);
        if (type == "plus") {
            cashback.balance += amount;
            if (user.lang == 'uz') {
                await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                    chat_id: user.telegramId,
                    text: `🧍‍♂️Уважаемый ${user.firstName}\n🔄 Ваш баланс изменился.\n💰 Ваш баланс ${timeUtil()} на: ${cashback.balance}`
                })
            } else {
                await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                    chat_id: user.telegramId,
                    text: `🧍‍♂️Xurmatli ${user.firstName}\n🔄 Sizning balansingiz o'zgardi.\n💰 Sizning ${timeUtil()} xolatiga ko'ra balansingiz: ${cashback.balance}`
                })
            }
            await historyModel.create({ admin: admin._id, amount: balance, type: type });
            await cashback.save();
            return cashback;
        } else if (type == "minus") {
            cashback.balance -= Number(balance);
            if (user.lang == 'uz') {
                await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                    chat_id: user.telegramId,
                    text: `🧍‍♂️Уважаемый ${user.firstName}\n🔄 Ваш баланс изменился.\n💰 Ваш баланс ${timeUtil()} на: ${cashback.balance}`
                })
            } else {
                await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                    chat_id: user.telegramId,
                    text: `🧍‍♂️Xurmatli ${user.firstName}\n🔄 Sizning balansingiz o'zgardi.\n💰 Sizning ${timeUtil()} xolatiga ko'ra balansingiz: ${cashback.balance}`
                })
            }
            await historyModel.create({ admin: admin.id, amount: balance, type: type });
            await cashback.save();
            return cashback;
        }
    }

    async getUser(userId) {
        const user = await userModel.findOne({ telegramId: userId }).populate('cashback');
        if (!user) throw ApiError.BadRequest('User topilmadi');

        return { id: user._id, firstName: user.firstName, lastName: user.lastName, barCode: user.cashback.barCode, cashbackBall: user.cashback.balance };
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

    async getUserByTelegram(telegramId) {
        const users = await userModel.find({ telegramId });
        return users
    }

    async deleteUser(userId) {
        const data = userModel.findOneAndDelete({ telegramId: userId });
        if (!data) throw ApiError.BadRequest('User topilmadi');
        
        return true;
    }

    async checkUser(telegramId) {
        const user = await userModel.findOne({ telegramId });
        if (!user) return false
        else return true
    }

}


module.exports = new UserService();