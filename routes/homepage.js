const express = require('express')
const router = express.Router()
const homePageController = require('../controllers/homepage')

router.get('/', homePageController.getHomePage)
module.exports = router