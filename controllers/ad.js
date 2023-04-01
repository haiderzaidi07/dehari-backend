const { pool } = require('../config/dbConfig')

module.exports = {
    getPostAd: (req, res) => {
        res.render('postad.ejs')
    },
    // getAdList:(req, res)=>{
    //     res.render('adList.ejs')
    // }
    postAd: (req, res) =>{
        let {title, description, price} = req.body
       pool.query(`INSERT INTO ads (title, description, price, userid)
       values ($1, $2, $3, $4)`, [title, description, price, req.user.id], 
       (err, result) =>{
        if (err){
            console.error(err)
        }
        else{
            // req.session.userId = result.rows[0].id;
            res.redirect('/homepage')
        }
       }) 
    }
}