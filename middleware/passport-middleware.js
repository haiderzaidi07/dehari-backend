const passport = require('passport')
// require('dotenv').config({path: './config/.env'})
require("dotenv").config({path: '../config/.env'});
const { Strategy } = require('passport-jwt')
const ExtractJwt = require('passport-jwt').ExtractJwt

const {pool} = require('../config/dbConfig')

const cookieExtractor = function (req) {
  let token = null

  if (req && req.cookies) token = req.cookies['token']
    console.log(token)
  return token
}

const opts = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: cookieExtractor,
}



passport.use(
  new Strategy(opts, async (payload, done) => {
    
    try {
      const { rows } = await pool.query(
        'SELECT id, username FROM users WHERE id = $1',
        [payload.id]
      )

    
      if (!rows.length) {
        throw new Error('401 not authorized')
      }

      let user = { id: rows[0].id, username: rows[0].username }  
      return await done(null, user)

    } catch (error) {

        console.log(error.message)
        return await done(null, false) 
    
    }
  })
)

