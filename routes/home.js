const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
// const { ensureAuth } = require('../middleware/auth')

router.get('/', homeController.landingPage)

module.exports = router