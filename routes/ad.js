const { Router } = require('express')
const { postAd, getAdList } = require('../controllers/ad')
const { userAuth } = require('../middleware/auth-middleware')

const router = Router()

router.post('/post', userAuth, postAd)
router.get('/list', userAuth, getAdList)
module.exports = router