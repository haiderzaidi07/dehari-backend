require("dotenv").config({path: '../config/.env'});
const {pool} = require('../config/dbConfig')
const { hash } = require('bcryptjs')
const jwt = require('jsonwebtoken')




