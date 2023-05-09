require("dotenv").config({path: '../config/.env'});
const {pool} = require('../config/dbConfig')



    // exports.getAdList= (req, res)=>{
    //     // console.log(req.user.id)
    //     pool.query(`SELECT * FROM ads`, 
    //     (err, result) => {
    //         if (err) { console.error(err) }

    //         else{
    //             // console.log(result.rows)
    //         }

    //         res.render('adList.ejs', {ads: result.rows })
    //     })
    // },
    exports.postAd = (req, res) =>{
       
       try{
        const {title, description, price, userid} = req.body
        try{
            pool.query(`INSERT INTO ads (title, description, price, userid)
            values ($1, $2, $3, $4)`, [title, description, price, userid])
        } catch (error) {
          console.log(error);
        }
        return res.status(200).json({
            success: true,
            message: 'Ad posted successfully'
        })
    } catch (error){
        res.status(500).json({
            error: error.message,
          })
    }
        
    },
    exports.postBid= (req, res) =>{
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
