const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')


//Connect to Database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Making a request/route
app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to supp desk API'})
})

//Routes - register users
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//Error Handler
app.use(errorHandler)



app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))