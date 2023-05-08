const passport = require('passport')
require('./passport-middleware')

exports.userAuth = passport.authenticate('jwt', { session: false })

