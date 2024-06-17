const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telephone: { type: String, required: true },
    telegramId: { type: String, required: true },
    lang: { type: String, required: true },
    birthdayDate: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
    cashback: { type: Schema.Types.ObjectId, ref: 'cashback' },
});

// Correcting the text index to use the existing fields
UserSchema.index({ firstName: 'text', lastName: 'text', telegramId: 'text' });

module.exports = model('user', UserSchema);
