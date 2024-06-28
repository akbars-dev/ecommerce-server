const orderModel = require('../models/order-model.js');
const usersModel = require('../models/user-model.js');
const productsModel = require('../models/product-model.js');
const mongooseToXlsx = require('mongoose-to-xlsx');
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
          const users = await usersModel.find({});
          const usersData = users.map(user => user.toJSON());
          
          const filePath = path.join(__dirname, '../', '../'. 'public', 'users.xlsx');
          await mongooseToXlsx(usersData, filePath, fnuction (err, data) => {
              if (err) console.log(err);
              console.log('exel file saved');
          });
          
          return true
    }
}


module.exports = new AnaliyticsService();