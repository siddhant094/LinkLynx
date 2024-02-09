const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    links: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Url' }],
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
