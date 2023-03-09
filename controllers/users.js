const bcrypt = require('bcrypt')

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
        console.log({username, email, password, password2})
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
            console.log(hashedPassword)
            pool.query(`INSERT INTO  Users (username, email, password)
            values ($1, $2, $3) returning id, password`, [username, email, password],
            (err, result)=>{
                if (err){
                    throw err
                }
                else{
                    console.log(result.rows)
                }
            })
        }
    }
}