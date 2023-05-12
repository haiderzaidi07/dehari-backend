const { Router } = require('express')
// const { postAd, getAdList } = require('../controllers/ad')
const {makebid, acceptBid, rejectBid} = require('../controllers/bid')
const {
    validationMiddleware,
  } = require('../middleware/validations-middleware')
  const passport = require('passport')
  require('../middleware/passport-middleware')
  const {
    userAuth
  } = require('../middleware/auth-middleware')

const router = Router()

router.post('/makebid', userAuth, validationMiddleware , makebid)
router.post('/acceptbid', userAuth, acceptBid)
router.post('/rejectbid', userAuth, rejectBid)

module.exports = router