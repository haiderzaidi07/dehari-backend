require("dotenv").config({
    path: '../config/.env'
});
const {
    pool
} = require('../dbConfig')


exports.makebid = async (req, res) => {
    
    const {description, bid, ad_id, userid} = req.body;

 
    const ad = await pool.query('Select * from ads where id=$1', [ad_id])
    console.log(ad)
     pool.query(`Insert into bids (description, bid, user_id, ad_id) values ($1, $2, $3, $4)`, [description, bid, userid, ad_id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
       
    });
    const bid_id= await  pool.query('SELECT id FROM bids WHERE ad_id IN ($1) AND user_id IN ($2) AND description IN ($3) AND bid IN ($4)', [ad_id, userid, description, bid])
    console.log(bid_id);
     pool.query(`INSERT INTO bidsonads (bidid, adid, status) values ($1, $2, false)`, [bid_id.rows[0].id, ad_id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
       console.log("bid on ad added")   
    });    
    return res.status(200).json({message: "added bid"});

}

exports.acceptBid = async (req, res) => {
    const { bidid, adid } = req.body
    try {
        await pool.query(`UPDATE bidsonads set status=true where bidid=$1 and adid=$2`, [bidid, adid])
        return res.status(200).json({ message: 'Bid updated successfully' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

exports.rejectBid = async (req, res) => {
    const { bidid, adid } = req.body
    try {
        await pool.query(`Delete from bidsonads where bidid=$1 and adid=$2`, [bidid, adid])
        pool.query(`Delete from bids where id = $1`,[bidid])
        return res.status(200).json({ message: 'Bid updated successfully' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

exports.deleteBid = async (req, res) => {
    const {bidid} = req.body
    try {
        await pool.query(`Delete from bids where id  $1`, [bidid])
        return res.status(200).json({ message: 'Bid deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

