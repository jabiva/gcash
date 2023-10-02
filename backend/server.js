const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const gCashTransacRouter = require('./routes/gcash')
require('dotenv').config()

const app = express()
const port = process.env.port || 5000

// MIDWARE
app.use(cors());
app.use(express.json())

// connection

const URI = process.env.mongoURI
mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open',()=>{
    console.log("MongoDB Connected")
})


app.use('/gcashTransac', gCashTransacRouter)
app.listen(port, ()=>{
    console.log(`Connected to port : ${port}`)
})