
const { pool } = require('../config/dbConfig')
const { compare } = require('bcryptjs')




const usernameExists = async (value) => {
  const result = await pool.query('SELECT * from users WHERE username = $1', [value])
  if (result.rows.length) {
    throw new Error('Username already exists.')
  }
}


async function loginFieldsCheck(req, res, next) {
    const { username, password } = req.body;
    console.log(req.body);
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
  registerValidation: usernameExists,
  loginValidation: loginFieldsCheck,
}
