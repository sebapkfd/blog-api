const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, maxlenght: 20, minlength: 1},
    password: {type: String, required: true, maxlenght: 50, minlength: 1},
})

module.exports = mongoose.model('User', UserSchema);