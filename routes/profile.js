const { Router } = require('express')
const {
  postProfile, editProfile
} = require('../controllers/profile')
const {
  validationMiddleware,
} = require('../middleware/validations-middleware')
const passport = require('passport')
require('../middleware/passport-middleware')



const { insertProfile, changeProfile } = require('../middleware/profile-middleware')

const router = Router()


router.post('/profile', insertProfile, validationMiddleware ,postProfile)
router.put('/profile', editProfile, validationMiddleware, changeProfile)


module.exports = router
