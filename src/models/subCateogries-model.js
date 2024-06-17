const { model, Schema } = require('mongoose');


const SubCategoriesSchema = new Schema({
    name: { type: String, required: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
})



module.exports = model('sub-categories', SubCategoriesSchema);