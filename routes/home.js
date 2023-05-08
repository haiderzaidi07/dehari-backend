const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureAuth } = require('../middleware/auth-middleware')

router.get('/', homeController.landingPage)
router.get('/homepage', ensureAuth, homeController.getHomePage)

module.exports = router