require('dotenv').config({path: './config/.env'})
const express = require('express')
const app = express()
// const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')
const PORT = 4500
const { pool } = require('./config/dbConfig')


// require('./config/passport')(passport)

// connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', homeRoutes)
app.use('/users', userRoutes)
// app.use('/courses', coursesRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})