
const { pool } = require('../dbConfig')
const {hash, compare } = require('bcryptjs')





const usernameExists = async (req, res, next) => {
  const { username } = req.body;
  try {
    const result = await pool.query('SELECT * from users WHERE username = $1', [username]);
    if (result.rows.length) {
      throw new Error('Username already exists.');
    }
    next(); // pass control to the next middleware or route handler
  } catch (error) {
    next(error)
  }
};



// const registerUser = async(user) => {
//   const insert = await pool.query(
//     'Insert into users (username, password) values ($1, $2) returning *', [user.username, user.password]
//   )
//   if (  !insert.rows.length) {
//     throw new Error('Username entered.')
//   }
//   return insert.rows[0];
// }


// Middleware function
const registerUser = async (req, res, next) => {
  const { username, email, password, securityQuestion, securityAnswer } = req.body

  try {
    const hashedPassword = await hash(password, 10)

    const user = await pool.query('insert into users(username,email, password, securityQuestion, securityAnswer) values ($1 , $2, $3, $4, $5) returning *', [
      username,
      email,
      hashedPassword,
      securityQuestion,
      securityAnswer
    ])
   

    req.user = user.rows[0]

    next()

  } catch (error) {
    next(error);
  }
}





async function loginFieldsCheck(req, res, next) {
    const { username, password } = req.body;
    // console.log(req.body);
    try {
      const user = await pool.query('SELECT * from users WHERE username = $1', [username]);


      if (!user.rows.length) {
        throw new Error('Email does not exist.');
      }
  
      const validPassword = await compare(password, user.rows[0].password);
  
      if (!validPassword) {
        throw new Error('Wrong password');
      }
      console.log('loginfieldcheck')
      console.log(user.rows[0])
      req.user = user.rows[0];
      next();
    } catch (err) {
      next(err);
    }
  }
  

module.exports = {
  registerUser: registerUser,
  registerValidation: usernameExists,
  loginValidation: loginFieldsCheck,
}
