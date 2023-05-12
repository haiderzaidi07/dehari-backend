require("dotenv").config({path: '../config/.env'});
const {pool} = require('../dbConfig')
const { hash } = require('bcryptjs')
const jwt = require('jsonwebtoken')




