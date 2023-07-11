const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        id: String,
        credit: Number,
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;