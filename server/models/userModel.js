const mongoose = require('mongoose');

// Setup schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Export User model
let User = mongoose.model('user', userSchema);
module.exports = User;
