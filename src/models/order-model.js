const {model, Schema} = require('mongoose');


const OrderSchema = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'cashback'}],
    price: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user' }
})



module.exports = model('order', OrderSchema)


