const {model, Schema} = require('mongoose');


const HistorySchema = new Schema({
    type: { type: String, required: true },
    amount: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'admin' },
})



module.exports = model('history', HistorySchema)