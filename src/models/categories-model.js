const {model, Schema} = require('mongoose');


const CategoriesSchema = new Schema({
    name: { type: String, required: true },
})



module.exports = model('categories', CategoriesSchema);