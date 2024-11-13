const express = require('express')
const app = express()
const mongoconnect = require("./config/mongodb")
const cors = require('cors');
const userRoutes = require("./routes/userRoutes")
app.use(express.json());
app.use(cors());
app.use("/user",userRoutes)

app.listen(5000,() =>
{
    console.log("port is running at 8000")
})