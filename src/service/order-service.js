const ApiError = require("../errors/api-error");
const cashbackModel = require("../models/cashback-model");
const orderModel = require("../models/order-model");
const userModel = require("../models/user-model");


class OrderService {
    async create(products, userId, price) {
        const order = await orderModel.create({ product: products, price: price, author: userId });
        const onePercent = Number(price.split('$')[0]) * 0.01;
        const user = await userModel.findById(userId);
        if(!user) throw ApiError.BadRequest('User aydi xato kiritildi');
        const cashback = await cashbackModel.findById(user.cashback);
        console.log(user.cashback) 
        if(!cashback) throw ApiError.BadRequest('User aydi xato kiritildi');

        cashback.balance += onePercent;
        await cashback.save();
        return order;
    }

    async all(page, limit) {
        const orders = await  orderModel.find({}).skip((page - 1) * limit).limit(limit)
        return orders;
    }

    async getByAuthor(authorId) { 
        const orders = await orderModel.find({author: authorId});
        return orders;
    }

    async get(id) {
        const order = await orderModel.findById(id);
        if(!order) throw ApiError.BadRequest('Aydi xato kiritildi');
        return order;
    }
}

module.exports = new OrderService();