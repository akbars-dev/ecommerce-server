const { model, Schema } = require('mongoose');


const CategoriesSchema = new Schema({
    uz: {
        name: { type: String, required: true },
    },
    ru: {
        name: { type: String, required: true },
    }
})



module.exports = model('categories', CategoriesSchema);