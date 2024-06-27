const orderModel = require('../models/order-model.js');


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
                {
                    $sort: { orderCounts: -1 }
                }
            }
        ])
        const topCostumers = await orderModel.aggregate({
            {
                $group: {
                    _id: '$customerId',
                    ordersCount: { $sum: 1 } // Count the number of orders per customer
                }
            },
            {
                $lookup: {
                    from: 'customers', // Collection name of Customer model
                    localField: '_id',
                    foreignField: '_id',
                    as: 'customer'
            }
        },
        {
            $unwind: '$customer'
        },
        {
            $sort: { ordersCount: -1 } // Sort by ordersCount descending
        }
    })
        
        return { topProducts, topCostumers } 
    }
}


module.exports = new AnaliyticsService();