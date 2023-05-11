const { Router } = require('express')
// const { postAd, getAdList } = require('../controllers/ad')
const {makebid, acceptBid, rejectBid} = require('../controllers/bid')
const {
    validationMiddleware,
  } = require('../middleware/validations-middleware')
  const passport = require('passport')
  require('../middleware/passport-middleware')


const router = Router()

router.post('/makebid',validationMiddleware , makebid)
router.post('/acceptbid', acceptBid)
router.post('/rejectbid', rejectBid)

module.exports = router