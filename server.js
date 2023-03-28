require('dotenv').config({path: './config/.env'})
const express = require('express')
const app = express()
// const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')
const homePageRoutes = require('./routes/homepage')
const PORT = 4500
const { pool } = require('./config/dbConfig')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const initializePassport = require('./config/passportConfig')

initializePassport(passport)

// require('./config/passport')(passport)

// connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
app.use('/users', userRoutes)
app.use('/homepage', homePageRoutes) // delete soon

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})