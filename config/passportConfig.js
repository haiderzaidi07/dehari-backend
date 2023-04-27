const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { pool } = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const passport = require('passport');



    passport.serializeUser((user, done)=> done(null, user.id))
    
    passport.deserializeUser((id, done)=>{
        
        pool.query(
            `select * from users where id = $1`, [id], (err, results)=>{
                if (err) {
                    throw err
                }
                return done(null, results.rows[0])
            }
        )
    })
    passport.use(
        new JwtStrategy(
          {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
          },
          (payload, done) => {
            User.findById({ _id: payload.userId }, (err, user) => {
              if (err) return done(err, false);
              if (user) return done(null, user);
              else return done(null, false);
            });
          }
        )
      );
      
      
    const authenticateUser = (username, password, done)=>{
        pool.query(
            `select * from users where username = $1`, [username],
            (err, results)=>{
                if (err){
                    throw err
                }
                // console.log (results.rows)
                
                if (results.rows.length>0){
                    const user = results.rows[0]

                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if (err){
                            throw err
                        }
                        
                        if (isMatch){
                            return done(null, user)
                        }
                        else{
                            console.log('password not correct')
                            return done(null, false, {message: "Password is not correct"})
                        }
                    })
                }else{
                    console.log('email not registered')
                    return done(null, false, {message: "Email is not registered"})
                }
            }
        )
    }

    passport.use(
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
            
        },
        authenticateUser)
    )

   


