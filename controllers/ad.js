require("dotenv").config({path: '../config/.env'});
const {pool} = require('../dbConfig')



exports.getAdList = (req, res) => {
    pool.query(`select ads.id, ads.title, ads.description, ads.price, ads.userid, users.username as ad_username from ads join users on ads.userid = users.id;`, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Internal server error'
        });
      }
      
      const ads = results.rows;
      console.log(ads); // add this line to log the ads to console
      return res.status(200).json(ads);
    });
  },
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


    exports.deleteAd = async (req, res) => {
      let adid = req.params.id;
      try{
        await pool.query(`DELETE FROM ads WHERE id = $1`, [adid])
        res.status(200).json({ message: 'Ad deleted successfully' });
      } catch(error)
      {
        res.status(500).json({ error: error.message });
      }

    }
