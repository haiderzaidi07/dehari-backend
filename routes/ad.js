const { Router } = require('express')
const { postAd, getAdList } = require('../controllers/ad')


const router = Router()

router.post('/post', postAd)
router.get('/list', getAdList)
module.exports = router