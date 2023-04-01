const bcrypt = require('bcrypt')
const passport = require('passport')
const validator = require('validator')
const { pool } = require('../config/dbConfig')

module.exports = {
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getRegister: (req, res) => {
        res.render('register.ejs')
    },
    postRegister: async (req, res) => {
        let {username, email, password, password2 } = req.body
        // console.log(pool);
        // console.log({username, email, password, password2})
        let errors = []
        
        if (!username || !email || !password || !password2){
            errors.push({message: "Please enter all fields"})
        }
        
        if (password.length<6){
            errors.push({message: "Password must be at least 6 characters"})
        }

        if (password!= password2){
            errors.push({message: "Passwords do not match"})
        }
        
        if (errors.length>0){
            res.render('register.ejs', {errors})
        } else{
            let hashedPassword = await bcrypt.hash(password, 10)
            
            pool.query(`INSERT INTO users (username, email, password)
            values ($1, $2, $3) returning id, password;`, [username, email, hashedPassword],
            (err, result)=>{
                if (err){
                    console.log(err)
                }
                else{
                    // console.log(result.rows)
                    req.session.userId = result.rows[0].id;
                    console.log(req.session)
                    res.redirect('/homepage')
                }
            })
        }
    },
    postLogin:(req,res,next)=>{ 
        
        const validationErrors=[] 
        // if(!validator.isEmail(req.body.email))validationErrors.push({msg:'Please enter a valid email address.'}) 
        if(validator.isEmpty(req.body.password)) validationErrors.push({msg:'Password cannot be blank.'}) 
         
        if (validationErrors.length) {
            console.log('error')
            console.log(validationErrors.length)
            req.flash('errors', validationErrors)
            returnres.redirect('/users/login')
        }

        // req.body.email=validator.normalizeEmail(req.body.email,{gmail_remove_dots:false}) 
        
        passport.authenticate('local', (err, user, info) => {

            if (err) { return next(err) }
            // console.log(info) 
            // console.log(user) 
            // console.log('error')
            if (!user) {
                req.flash('errors', info)
                // console.log('error')
                return res.redirect('/users/login')
            }
            req.logIn(user, (err) => {
                if (err) { return next(err) }
                console.log('success')
                req.flash('success', { msg: 'Success! You are logged in.' })
                res.redirect('/homepage')
            })
        })(req, res, next)
    },
    signOut: async (req, res) =>  {
        // delete session data from PostgreSQL
        const query = {
          text: 'DELETE FROM session WHERE sid = $1',
          values: [req.sessionID],
        };
        await pool.query(query);
      
        // destroy session and redirect user to login page
        req.session.destroy(() => {
            res.redirect('/users/login');
        });
      }
    
}
