const { Router } = require('express')
const { postAd } = require('../controllers/ad')


const router = Router()

router.post('/post', postAd)

module.exports = router