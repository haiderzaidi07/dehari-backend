require('dotenv').config({path: './config/.env'})
const express = require('express')
const app = express()
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')
const adRoutes = require('./routes/ad')
const profileRoutes = require('./routes/profile')
const { pool } = require('./config/dbConfig')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const flash = require('express-flash')
const passport = require('passport')
const initializePassport = require('./config/passportConfig')

initializePassport(passport)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
  store: new pgSession({
    pool,
    tableName: 'session',
    // Optional: customize the cleanup interval (in milliseconds)
    // How frequently expired sessions will be cleared; defaults to 1 hour
    // pruneSessionInterval: 60*1000 
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Optional: set the "secure" flag for HTTPS-only cookies
}));

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
app.use('/users', userRoutes)
app.use('/ad', adRoutes)
app.use('/profile', profileRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})