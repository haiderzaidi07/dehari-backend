const express = require('express')
const router = express.Router()
const adController = require('../controllers/ad')
const { ensureAuth } = require('../middleware/auth')

router.get('/post',ensureAuth, adController.getPostAd)
router.post('/post', adController.postAd)
router.get('/list', adController.getAdList)

module.exports = router