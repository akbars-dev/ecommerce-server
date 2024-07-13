const orderModel = require('../models/order-model.js');
const usersModel = require('../models/user-model.js');
const productsModel = require('../models/product-model.js');
const path = require('path');

class AnalyticsService {
    async top() {
        const topProducts = await orderModel.aggregate([
            { $unwind: '$products' },
            {
                $group: {
                    _id: '$products',
                    orderCounts: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $project: {
                    _id: 1,
                    orderCounts: 1,
                    productName: { $arrayElemAt: ['$product.uz.name', 0] }
                },
            },
            {
                $sort: { orderCounts: -1 }
            }
        ]);

        const topCustomers = await orderModel.aggregate([
            {
                $group: {
                    _id: '$author',
                    ordersCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    _id: 1,
                    ordersCount: 1,
                    firstName: '$user.firstName',
                    telephone: '$user.telephone'
                }
            },
            {
                $sort: { ordersCount: -1 }
            }
        ]);

        return { topProducts, topCustomers };
    }

    async getUserExcel() {
        const users = await usersModel.find({}).populate('cashback');
        return users;
    }
}

module.exports = new AnalyticsService();