require("dotenv").config({path: '../config/.env'});
const {pool} = require('../config/dbConfig')
const { hash } = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const {registeruser} = require('../validators/auth')


exports.getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query('select * from users')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.id,
    username: user.username,
  }

  try {
    const token = payload;

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Register successfully',
      token : payload
    })
  } catch (error) {

    return res.status(500).json({
      error: error.message,
    })
  }
};



exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.id,
    username: user.username,
  }

  try {
    const token = payload;

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
      token : payload
    })
  } catch (error) {

    return res.status(500).json({
      error: error.message,
    })
  }
}

const cookieExtractor = function (req) {
  let token = null

  if (req && req.cookies) 
    token = req.cookies.token

    console.log(token)
}


exports.protected = async (req, res) => {
  try {
    const { id, username } = cookieExtractor(req)

    console.log("Cookie extractor")
 
    return res.status(200).json({
      username: username,
      id: id,
    })
  } catch (error) {
    res.status(500).json({
      message: "Cookie not extracted properly",
    })
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}
