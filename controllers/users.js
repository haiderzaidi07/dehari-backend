const bcrypt = require("bcrypt");
const passport = require("passport");
const validator = require("validator");
const { pool } = require("../config/dbConfig");
const jwt = require("jsonwebtoken");

module.exports = {
  getLogin: (req, res) => {
    res.render("login.ejs");
  },
  getRegister: (req, res) => {
    res.render("register.ejs");
  },
  postRegister: async (req, res) => {
    let { username, email, password, password2 } = req.body;
    // console.log(pool);
    // console.log({username, email, password, password2})
    let errors = [];

    if (!username || !email || !password || !password2) {
      errors.push({ message: "Please enter all fields" });
    }

    if (password.length < 6) {
      errors.push({ message: "Password must be at least 6 characters" });
    }

    if (password != password2) {
      errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
      res.status(500).json({
        errors,
      });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);

      pool.query(
        `INSERT INTO users (username, email, password)
            values ($1, $2, $3) returning id, password;`,
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
          }
        }
      );
    }
  },
  postLogin: (req, res, next) => {
    const validationErrors = [];
    // if(!validator.isEmail(req.body.email))validationErrors.push({msg:'Please enter a valid email address.'})
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
      res.status(500).json({
        message: {
          msgBody: "Password cannot be blank",
          msgError: true,
        },
      });
    }

    // req.body.email=validator.normalizeEmail(req.body.email,{gmail_remove_dots:false})

    passport.authenticate("local", { session: false }),
      (req, res) => {
        if (req.isAuthenticated()) {
          const { _id, email } = req.user;

          const token = jwt.sign(
            {
              userId: _id,
            },
            process.env.SECRET,
            { expiresIn: "24h" }
          );

          res.cookie(process.env.SECRET, token);
          res
            .status(200)
            .json({ isAuthenticated: true, user: { email }, token: token });
        }
      };
  },
  signOut: async (req, res) => {
    // delete session data from PostgreSQL

    passport.authenticate("jwt", { session: false }),
      (req, res) => {
        res.clearCookie(process.env.SECRET);
        res.json({ user: { email: "" }, success: true });
      };
  },
  authenticate: async (req, res) => {
    
        passport.authenticate("jwt", { session: false }),
        (req, res) => {
          const { email } = req.user;
          res.status(200).json({ isAuthenticated: true, user: { email } });
        }
      
  },
  checkAuthenticated : async (req, res) => {
     
    if (req.isAuthenticated()) {
      return next();
    }
    // whatever our url will be for the frontend server
    res.redirect("https://keeper-app-hammad.netlify.app/login");
  }
};
