require("dotenv").config({
  path: '../config/.env'
});
const {
  pool
} = require('../dbConfig')
const {
  hash
} = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const {registeruser} = require('../validators/auth')


exports.getUsers = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query('select * from users')

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

    return res.status(200).cookie('token', token, {
      httpOnly: true
    }).json({
      success: true,
      message: 'Register successfully',
      token: payload
    })
  } catch (error) {

    return res.status(500).json({
      error: error.message,
    })
  }
};

exports.forgotPassword = async (req, res) => {
  const {
    answer,
    newPassword,
    email, 
  } = req.body

  try {

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (!user.rows[0]) {
      throw new Error('User not found')
    }
    
    const userAnswer = user.rows[0].securityanswer
    if (userAnswer === answer) {
      const hashedPassword = await hash(newPassword, 10)
      await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

      return res.status(200).json({
        success: true,
        message: 'User verified successfully and password has been changed',
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }

}



exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.id,
    username: user.username,
  }

  try {
    const token = payload;

    return res.status(200).cookie('token', token, {
      httpOnly: true
    }).json({
      success: true,
      message: 'Logged in succefully',
      token: payload
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
    const {
      id,
      username
    } = cookieExtractor(req)

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
    return res.status(200).clearCookie('token', {
      httpOnly: true
    }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}




exports.profile = async (req, res) => {
  const userid = req.params.userid
  const user = await pool.query('SELECT * FROM profile WHERE userid = $1', [userid]);
  const placedBids = await pool.query('SELECT * FROM bids WHERE user_id = $1', [userid]);
  // const userAds = await pool.query('SELECT * FROM ads WHERE userid = $1', [userid]);
  const offersIGot = await pool.query('select bids.description as bid_description, bids.bid as bid, bids.user_id as bids_userid, ads.title as adtitle, ads.description as ad_description, ads.userid as ad_userid, bids.id as bidid, bidsonads.bidid as bidid, bidsonads.adid as adid  from bidsonads join bids on bidsonads.bidid=bids.id join ads on bidsonads.adid=ads.id  WHERE ads.userid = $1 and bidsonads.status=false', [userid]);
  const currentOrders = await pool.query('select bids.description as bid_description, bids.bid as bid, bids.user_id as bids_userid, ads.title as adtitle, ads.description as ad_description, ads.userid as ad_userid, bids.id as bidid, ads.id as adid  from bidsonads join bids on bidsonads.bidid=bids.id join ads on bidsonads.adid=ads.id  WHERE ads.userid = $1 and bidsonads.status=true', [userid]);
  console.log(offersIGot)
  const userProfile = user.rows[0];
  try {
    return res.status(200).json({
      message: 'User profile found',
      userProfile: userProfile,
      placedBids: placedBids,
      // userAds: userAds,
      offersIGot: offersIGot,
      currentOrders: currentOrders
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}