const passport = require('passport')
require('./passport-middleware')

exports.userAuth = (req, res, next) => { 
    console.log(req.cookies.token)

    if (req.cookies.token !== undefined) {
        console.log('User is authenticated')
        return next()
    } else {
        console.log('User is not authenticated')
        const error = new Error('You must be logged in to view this page.')
        return next(error)
    }   
}

