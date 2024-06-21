const {model, Schema} = require('mongoose');


const TokenSchema = new Schema({
    admin: { type: Schema.Types.ObjectId, ref: 'admin' },
    refreshToken: { type: String, required: true },
});


module.exports = model('token', TokenSchema)