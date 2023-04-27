require('dotenv').config({path: './config/.env'})
const express = require('express')
const app = express()
require('./config/passportConfig')
const passport = require('passport')
const cookieParser = require("cookie-parser");
// const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')
// const adRoutes = require('./routes/ad')
// const profileRoutes = require('./routes/profile')
const { pool } = require('./config/dbConfig')
// const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const flash = require('express-flash')
const cors = require('cors');
const bodyParser = require('body-parser')



// app.set('view engine', 'ejs')
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use(session({
  store: new pgSession({
    pool,
    tableName: 'session',

  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Optional: set the "secure" flag for HTTPS-only cookies
}));

// app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
app.use('/users', userRoutes)
app.use('/ad', adRoutes)
app.use('/profile', profileRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})