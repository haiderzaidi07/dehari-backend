const { Router } = require('express')
const { postAd, getAdList, deleteAd } = require('../controllers/ad')
const { userAuth } = require('../middleware/auth-middleware')

const router = Router()

router.post('/post', userAuth, postAd)
router.get('/list', userAuth, getAdList)
router.post('/delete', userAuth, deleteAd)

module.exports = router