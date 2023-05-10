const { Router } = require('express')
// const { postAd, getAdList } = require('../controllers/ad')
const {makebid} = require('../controllers/bid')
const {
    validationMiddleware,
  } = require('../middleware/validations-middleware')
  const passport = require('passport')
  require('../middleware/passport-middleware')


const router = Router()

router.post('/makebid',validationMiddleware , makebid)

module.exports = router