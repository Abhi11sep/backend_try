const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connection } = require('./configs/db')
const { noteRouter } = require('./routes/noteRoutes')
const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use("/notes", noteRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("error in connecting to db", error)
    }
    console.log('running on port 8080')
})