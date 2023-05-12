require("dotenv").config({path: '../config/.env'});
const {pool} = require('../config/dbConfig')
module.exports = {
    
    postProfile: (req,res)=>{
        try {
            return res.status(200).json({
              success: true,
              message: 'Profile added succefully',
            })
          } catch (error) {
            return res.status(500).json({
              error: error.message,
            })
          }
    },

    getProfile: async (req,res)=>{
      const userid =req.params.id
      const user = await pool.query('SELECT * FROM profile WHERE userid = $1', [userid]);
      console.log(user.rows[0])
      try {
        return res.status(200).json({
          message: 'Profile',
          userProfile: user.rows[0],
        })
      
      } catch (error) {
        return  res.status(500).json({
          error: error.message,
        })
      }
    },

    editProfile: (req,res)=>{
        try {
            return res.status(200).json({
              success: true,
              message: 'Profile Edited succefully',
            })
          } catch (error) {
            return res.status(500).json({
              error: error.message,
            })
          }
    },

    getCurrentOrders: async (req,res)=>{
      const userid = req.params.id;
      const currentOrders = await pool.query('select bids.description as bid_description, bids.bid as bid, bids.user_id as bids_userid, ads.title as adtitle, ads.description as ad_description, ads.userid as ad_userid, bids.id as bidid, ads.id as adid  from bidsonads join bids on bidsonads.bidid=bids.id join ads on bidsonads.adid=ads.id  WHERE ads.userid = $1 and bidsonads.status=true', [userid]);
      try {
        return res.status(200).json({
          message: 'Current Orders',
          currentOrders: currentOrders.rows,
        })
      } catch (error) {
        res.status(500).json({
          error: error.message,
        })
      }
    },
    getPlacedBids: async (req,res)=>{
      const userid = req.params.id;
      const placedBids = await pool.query('SELECT * FROM bids WHERE user_id = $1', [userid]);
      try {
        return res.status(200).json({
          message: 'Current Placed Bids',
          placedBids: placedBids.rows,
        })
      } catch (error) {
        res.status(500).json({
          error: error.message,
        })
      }
    },
    getUserAds: async (req, res) => {
      console.log("use ads called")
      const userid = req.params.id;
      const userAds = await pool.query('SELECT * FROM ads WHERE userid = $1', [userid]);
      try {
        return res.status(200).json({
          message: 'Current User Ads',
          userAds: userAds.rows,
        })
      } catch (error) {
        res.status(500).json({
          error: error.message,
        })
      }
    },
    getOffersIgot: async (req, res) => {
      const userid = req.params.id;
      const offersIGot = await pool.query('select bids.description as bid_description, bids.bid as bid, bids.user_id as bids_userid, ads.title as adtitle, ads.description as ad_description, ads.userid as ad_userid, bids.id as bidid, ads.id as adid  from bidsonads join bids on bidsonads.bidid=bids.id join ads on bidsonads.adid=ads.id  WHERE ads.userid = $1 and bidsonads.status=true', [userid]);
      try {
        return res.status(200).json({
          message: 'Current Offers I Got',
          offersIGot: offersIGot.rows,
        })
      } catch (error) {
        res.status(500).json({
          error: error.message,
        })
      }
    }

}