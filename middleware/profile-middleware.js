const { pool } = require("../dbConfig");


// Middleware function
const insertProfile = async (req, res, next) => {
  const { fullname, skills, certification, id } = req.body;


  console.log("profile setup", fullname, skills, certification, id);
  try {


    await pool.query(
      "INSERT INTO profile (fullname, skills, certification, userid) VALUES ($1, $2, $3, $4) returning *",
      [fullname, skills, certification, id],
      (err, results) => {
        if (err) {
          throw err;
        }
      }
    );
    next();
  } catch (error) {
    next(error);
  }
};


const changeProfile = async (req, res, next) => {
    const { fullname, skills, certification, userid} = req.body;
    


    try {
      console.log(fullname, skills, certification, userid)
        await pool.query('Update profile set fullname = $1, skills = $2, certification = $3 where userid = $4', [fullname, skills, certification, userid], (err, results)=>{
            if(err){
                throw err;
            }
            console.log(results.rows);
  
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
