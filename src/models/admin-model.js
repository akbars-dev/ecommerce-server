const {model, Schema} = require('mongoose');


const AdminSchema = new Schema({
    adminName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});


module.exports = model('admin', AdminSchema)