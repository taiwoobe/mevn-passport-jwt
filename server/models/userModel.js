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
    role: {
        type: String
    }
}, {
    timestamps: true
});

// Export User model
let User = mongoose.model('user', userSchema);
module.exports = User;
