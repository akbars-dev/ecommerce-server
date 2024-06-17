const {model, Schema} = require('mongoose');


const CashbackSchema = new Schema({
    barCode: { type: String, required: true },
    photoPath: { type: String, required: true },
    balance: { type: Number, default: 0 },
})



module.exports = model('cashback', CashbackSchema)