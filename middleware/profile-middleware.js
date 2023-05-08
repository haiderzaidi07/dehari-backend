const { pool } = require("../config/dbConfig");


// Middleware function
const insertProfile = async (req, res, next) => {
  const { fullname, skills, projects, certifictions } = req.body;
  const { id } = req.user;
  try {


    await pool.query(
      "INSERT INTO profile (fullname, skills, projects, certifictions, user_id) VALUES ($1, $2, $3, $4, $5) returning *",
      [fullname, skills, projects, certifictions, id],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);
        res.status(200).json({
          success: true,
        });
      }
    );
    next();
  } catch (error) {
    next(error);
  }
};


const changeProfile = async (req, res, next) => {
    const { fullname, skills, projects, samples, certifictions} = req.body;
    const {id} = req.user;


    try {

        await pool.query('Update profile set fullname = $1, skills = $2, projects = $3, certifictions = $4 where user_id = $5', [fullname, skills, projects, certifictions, id], (err, results)=>{
            if(err){
                throw err;
            }
            console.log(results.rows);
            res.status(200).json({
                success: true,
            });
        })
    
        next();

    } catch (error) {
        next(error)
    }

}

module.exports = {
  insertProfile: insertProfile,
  changeProfile: changeProfile,
};
