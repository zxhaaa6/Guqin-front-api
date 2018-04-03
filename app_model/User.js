const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    age: Number,
    country: String,
    province: String,
    city: String,
    active: Boolean,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
}, { collection: 'user' });

UserSchema.index({
    email: 1,
    phone: 1
});

const User = mongoose.model('User', UserSchema);

module.exports = User;