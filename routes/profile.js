const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const { ensureAuth } = require('../middleware/auth-middleware')

router.get('/', profileController.getProfile)
// router.get('/homepage', ensureAuth, homeController.getHomePage)

module.exports = router