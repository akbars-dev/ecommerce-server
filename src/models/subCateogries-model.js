const { model, Schema } = require('mongoose');


const SubCategoriesSchema = new Schema({
    uz: {
        name: { type: String, required: true },
    },
    ru: {
        name: { type: String, required: true },
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
})



module.exports = model('sub-categories', SubCategoriesSchema);