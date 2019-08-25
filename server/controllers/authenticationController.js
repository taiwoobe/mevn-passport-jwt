User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;


// Helper function to set JWT Token
function jwtSignUser(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    })
}

module.exports = {
    async register (req, res) {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
            const user = await User.create({
                email: req.body.email,
                password: hashedPassword
            });
            res.json({
                status: "success",
                message: 'User created sucessfully.',
                user: user,
                token: jwtSignUser(user.toJSON())
            });
        } catch(err) {
            res.status(400).send({
                error: 'The email you entered already exists.'
            })
        }
    },
    async login (req, res) {
        try {
            passport.authenticate('local', {session: false}, (error, user) => {
                if(err || !user){
                    const error = new Error('The Login information was incorrect.')
                    return next(error);
                }
            })
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!user || !passwordIsValid){
                return res.status(403).send({
                    error: 'The Login information was incorrect.'
                })
            } else {
                const updatedUser = {_id: user._id, email: user.email};
                res.json({
                    status: "success",
                    message: 'User login sucessfully.',
                    auth: true,
                    user: updatedUser,
                    token: jwtSignUser(user.toJSON())
                });
            }
        } catch(err) {
            res.status(500).send({
                error: 'Something went wrong trying to log you in. Try again.'
            })
        }
    }
}

