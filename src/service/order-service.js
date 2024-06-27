const ApiError = require("../errors/api-error");
const cashbackModel = require("../models/cashback-model");
const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const mongoose = require('mongoose');


class OrderService {
    async create(products, userId, price) {
        const user = await userModel.findByIdAndUpdate(userId, {$inc: { ordersCount: 1 }}, {new: true});
        const onePercent = Number(price.split('$')[0]) * 0.01;
        if (!user) throw ApiError.BadRequest('User aydi xato kiritildi');
        const cashback = await cashbackModel.findById(user.cashback);
        console.log(user.cashback)
        if (!cashback) throw ApiError.BadRequest('User aydi xato kiritildi');
        products.forEach(async (val) => {
            await productModel.findByIdAndUpdate(val, { ordersCount: {$inc: 1 }, {new: true})
        })
        const order = await orderModel.create({ products: products, price: price, author: userId });


        cashback.balance += onePercent;
        await cashback.save();
        return order;
    }

    async all(page, limit) {
        if (!page || !limit) {
            const orders = await orderModel.find({}).populate('author');
            return orders;
        }
        const orders = await orderModel.find({}).skip((page - 1) * limit).limit(limit).popoulate('author');
        return orders;
    }

    async getByAuthor(authorId) {
        const orders = await orderModel.find({ author: authorId });
        return orders;
    }

    async get(id) {
        const orderObjectId = new mongoose.Types.ObjectId(id);
        const order = await orderModel.aggregate([
            { $match: { _id: orderObjectId } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'products'
                }
            }
        ]);
        if (!order) throw ApiError.BadRequest('Aydi xato kiritildi');
        return order[0];
    }
}

module.exports = new OrderService();