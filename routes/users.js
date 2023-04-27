const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/login', usersController.getLogin)
router.get('/register', usersController.getRegister)
router.post('/login', usersController.postLogin)
router.post('/register', usersController.postRegister)
router.post('/authenticated', usersController.authenticate)
router.get('/signOut', usersController.signOut)

module.exports = router