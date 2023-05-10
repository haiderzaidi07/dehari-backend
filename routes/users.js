const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  profile
} = require('../controllers/users')
const {
  validationMiddleware,
} = require('../middleware/validations-middleware')
const passport = require('passport')
require('../middleware/passport-middleware')



const { registerValidation, loginValidation, registerUser } = require('../validators/auth')

const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', protected)
router.post('/register', registerValidation, registerUser, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
router.get('/profile/:userid', profile)

module.exports = router
