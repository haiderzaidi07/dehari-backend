const express = require('express')
const app = express()
// require('./config/passportConfig')
require('dotenv').config({path: './config/.env'})
// const {PORT} = require('./constants/index')
const cookieParser = require("cookie-parser");
const passport = require('passport')
require('./middleware/passport-middleware')


const cors = require('cors');


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs')
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(passport.initialize())
const userRoutes = require('./routes/users')

app.use('/users', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})