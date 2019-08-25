User = require('../models/userModel');

module.exports = {
    async getUsers(req, res)  {
        try {
            const user = await User.find({});
            res.json({
                status: 'success',
                message: 'Users retrieved successfully.',
                data: user
            })
        } catch (err) {
            req.status(500).send({
                error: 'Cannot retrive user. Try again.'
            })
        }
    }
}

