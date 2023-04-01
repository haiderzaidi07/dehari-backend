module.exports = {
    ensureAuth: function (req, res, next) {
      // console.log(req.session.passport.user)
      if (req.session.passport.user) {
        return next()
      } else {
        res.redirect('/users/login')
      }
    }
}