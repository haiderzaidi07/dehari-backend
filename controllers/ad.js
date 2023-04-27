const { pool } = require('../config/dbConfig')

module.exports = {
    getPostAd: (req, res) => {
        res.render('postAd.ejs')
    },
    getAdList:(req, res)=>{
        // console.log(req.user.id)
        pool.query(`SELECT * FROM ads`, 
        (err, result) => {
            if (err) { console.error(err) }

            else{
                // console.log(result.rows)
            }

            res.render('adList.ejs', {ads: result.rows })
        })
    },
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
    },
    postBid: (req, res) =>{
        let {description, bid} = req.body;
        
        // console.log(req.body)
        pool.query(`INSERT INTO bids (description, bid, ad_id) 
        values ($1, $2, $3)`, [description, bid, req.body.ad_id+1],
        (err, result) =>{
            if (err){
                console.error(err)
            }
            else{
                // req.session.userId = result.rows[0].id;
                res.redirect('/ad/list')
            }
        })
    }
}