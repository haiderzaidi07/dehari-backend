const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  profile,
  forgotPassword,
} = require('../controllers/users')
const {
  validationMiddleware,
} = require('../middleware/validations-middleware')
const passport = require('passport')
require('../middleware/passport-middleware')
const {
  userAuth
} = require('../middleware/auth-middleware')


const { registerValidation, loginValidation, registerUser } = require('../validators/auth')

const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', protected)
router.post('/register', registerValidation, registerUser, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
router.get('/profile/:userid', userAuth, profile)
router.post('/forgot-password', forgotPassword)

module.exports = router
