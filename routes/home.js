const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const {
    userAuth
  } = require('../middleware/auth-middleware')

router.get('/', homeController.landingPage)
router.get('/homepage', userAuth, homeController.getHomePage)

module.exports = router