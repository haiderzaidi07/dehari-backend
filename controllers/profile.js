require("dotenv").config({path: '../config/.env'});

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
    }
}