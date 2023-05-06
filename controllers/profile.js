require("dotenv").config({path: '../config/.env'});
const {pool} = require('../config/dbConfig')

module.exports = {
    getProfile: (req,res)=>{
        console.log(req.user)
        res.render('profile.ejs', { user: req.user })
    },
    postProfile: (req,res)=>{
        const { fullname, skills, projects, certifictions} = req.body;

        const {id} = req.user;

        pool.query('INSERT INTO profile (fullname, skills, projects, certifictions, user_id) VALUES ($1, $2, $3, $4, $5)', [fullname, skills, projects, certifictions, id], (err, results)=>{
            if(err){
                throw err;
            }
            console.log(results.rows);
            res.status(200).json({
                success: true,
            });
        })
    },

    editProfile: (req,res)=>{
        const { fullname, skills, projects, samples, certifictions} = req.body;
        const {id} = req.user;

        pool.query('Update profile set fullname = $1, skills = $2, projects = $3, certifictions = $4 where user_id = $5', [fullname, skills, projects, certifictions, id], (err, results)=>{
            if(err){
                throw err;
            }
            console.log(results.rows);
            res.status(200).json({
                success: true,
            });
        })
    }
}