const express = require('express')
const app = express()
// const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const PORT = 4500


// require('dotenv').config({path: './config/.env'})

// require('./config/passport')(passport)

// connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', homeRoutes)
// app.use('/courses', coursesRoutes)
// app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})