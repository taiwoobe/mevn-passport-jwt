const passport = require('passport')
const User = require('../models/userModel')
const config = require('../config/jwtConfig')

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    }, 
    async (username, password, done) => {
    try {
      const user = await User.findOne({username: username});
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!user || !passwordIsValid) {
            return done(null, false, {error: 'Incorrect Username/Password combination'});
        } else {
            return done(null, user);
        }
    } catch (error) {
        done(error);
    }
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
    }, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({ _id: jwt_payload._id });
        if (!user) {
            console.log('User not found in database');
            return done(err, false)
        } else {
            console.log('User found in database');
            return done(null, user);
        }
    } catch(err) {
        return done(err, false);
    }
}))

module.exports = null;