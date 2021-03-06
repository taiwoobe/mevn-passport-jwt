const passport = require ('passport');

module.exports = function(req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user) {
        if (err || !user || user.role !== 'admin') {
            res.send({
                error: 'You are not allowed to view this resource.'
            })
        } else {
            req.user = user;
            next();
        }
    }) (req, res, next)
}