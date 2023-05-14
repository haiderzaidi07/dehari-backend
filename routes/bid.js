const { Router } = require('express')
// const { postAd, getAdList } = require('../controllers/ad')
const {makebid, acceptBid, rejectBid, deleteBid} = require('../controllers/bid')
const {
    validationMiddleware,
  } = require('../middleware/validations-middleware')
  const passport = require('passport')
  require('../middleware/passport-middleware')
  const {
    userAuth
  } = require('../middleware/auth-middleware')

const router = Router()
const upload = require('../middleware/multer')

router.post('/makebid', userAuth, validationMiddleware, upload.single("file"), makebid)
router.post('/acceptbid', userAuth, acceptBid)
router.post('/rejectbid', userAuth, rejectBid)
router.delete('/deletebid/:id', userAuth, deleteBid)

module.exports = router