const {model, Schema} = require('mongoose');


const OrderSchema = new Schema({
    product: [{ type: Schema.Types.ObjectId, ref: 'cashback'}],
    price: { type: String, required: true }
})



module.exports = model('order', OrderSchema)


