const { model, Schema } = require('mongoose');


const DiscountSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    photoPath: { type: String, required: true },
    price: { type: String, required: true },
}) 


module.exports = model('discount', DiscountSchema);