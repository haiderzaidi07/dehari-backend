const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
} = require('../controllers/users')
const {
  validationMiddleware,
} = require('../middleware/validations-middleware')
const passport = require('passport')
require('../middleware/passport-middleware')



const { registerValidation, loginValidation } = require('../validators/auth')

const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router
