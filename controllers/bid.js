require("dotenv").config({
    path: '../config/.env'
});
const {
    pool
} = require('../config/dbConfig')


const makebid = async (req, res) => {
    
    const {description, bid, ad_id, userid} = req.body;

 
    const ad = await pool.query('Select * from ads where id=$1', [ad_id])
    console.log(ad)
     pool.query(`Insert into bids (description, bid, userid, ad_id) values ($1, $2, $3, $4)`, [description, bid, userid, ad_id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
       
        return res.status(200).json({message: "added bid"});
    });
     pool.query(`Insert into orders (ad_title, ad_description, bid_description, bid_bid, userid) values ($1, $2, $3, $4, $5)`, [ad.rows[0].title, ad.rows[0].description, description, bid, ad.rows[0].userid], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
       
        return res.status(200).json({message: "added bid"});
    });    
}

exports.makebid = makebid;