User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');
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
                username: req.body.username,
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
                error: 'The username you entered already exists.'
            })
        }
    },
    async login (req, res, next) {
        try {
            passport.authenticate('login', {session: false}, (error, user) => {
                if (error || !user) { 
                    res.status(400).send({
                        error: 'Incorrect Username/Password combination.'
                    })
                    return next(error);
                } else {
                    req.login(user, { session : false }, async (error) => {
                        if (error) {
                            res.status(500).send({
                                error: 'Something went wrong. Try again.' 
                            });
                        }
                        const updatedUser = {_id: user._id, username: user.username};
                        res.json({
                            status: "success",
                            message: 'User login sucessfully.',
                            auth: true,
                            user: updatedUser,
                            token: jwtSignUser(user.toJSON())
                        });
                    })
                }
            }) (req, res, next);
        } catch(err) {
            res.status(500).send({
                error: 'Something went wrong trying to log you in. Try again.'
            })
        }
    }
}

