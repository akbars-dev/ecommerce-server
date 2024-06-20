const { model, Schema } = require('mongoose');


const ProductSchema = new Schema({
    uz: {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    ru: {
        name: { type: String, required: true },
        description: { type: String, required: true }
    },
    photo: { type: String, required: true },
    price: { type: String, required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'sub-categories' },
    category: { type: Schema.Types.ObjectId, ref: 'categories' }
})





module.exports = model('product', ProductSchema);