const orderModel = require('../models/order-model.js');
const usersModel = require('../models/user-model.js');
const productsModel = require('../models/product-model.js');
const createExelFile = require('../utils/exel-util.js');
const path = require('path');

class AnaliyticsService {
    async top() {
        const topProducts = await orderModel.aggregate([
            {  $unwind: '$products' },
            {
                $gorup: {
                    _id: '$products',
                    orderCounts: { $sum: 1}
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
                    productName: { $arrayElemAt: ['$product.name', 0] }
                },
            },
            {
                $sort: {ordersCount: -1}
            }
        ])
        const topCostumers = await orderModel.aggregate([
        {
            $group: {
                _id: '$author',
                ordersCount: { $sum: 1 } // Count the number of orders per customer
            }
        },
        {
                $lookup: {
                    from: 'users', // Collection name of Customer model
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
            }
        },
        {
            $unwind: 'user'
        },
        {
            $sort: { ordersCount: -1 } // Sort by ordersCount descending
        }
    ])
        
        return { topProducts, topCostumers } 
    }
    
    async getUserExel () {
        const users = await usersModel.find({}).populate('cashback');
        return users
    }
}


module.exports = new AnaliyticsService();