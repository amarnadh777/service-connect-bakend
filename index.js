const express = require('express')
const app = express()
const mongoconnect = require("./config/mongodb")

const userRoutes = require("./routes/userRoutes")
app.use(express.json());
app.use("/user",userRoutes)

app.listen(8000,() =>
{
    console.log("port is running at 8000")
})