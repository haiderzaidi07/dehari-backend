const { Router } = require('express')
const {
  postProfile, editProfile, getCurrentOrders, getOffersIgot, getPlacedBids, getUserAds, getProfile
} = require('../controllers/profile')
const {
  validationMiddleware,
} = require('../middleware/validations-middleware')
const passport = require('passport')
require('../middleware/passport-middleware')
const {
  userAuth
} = require('../middleware/auth-middleware')


const { insertProfile, changeProfile } = require('../middleware/profile-middleware')

const router = Router()


router.post('/profile', userAuth, insertProfile, validationMiddleware ,postProfile)
router.put('/editprofile', userAuth, changeProfile, validationMiddleware, editProfile)
router.get('/currentorders/:id', userAuth, getCurrentOrders)
router.get('/offersigot/:id', userAuth, getOffersIgot)
router.get('/placedbids/:id', userAuth, getPlacedBids)
router.get('/getads/:id', userAuth, getUserAds)
router.get('/profile/:id', userAuth, getProfile)


module.exports = router
