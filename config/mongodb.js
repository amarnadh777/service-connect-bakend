const mongoose = require("mongoose")
const connect = async() =>
{
    try {
        mongoose.connect("mongodb://localhost:27017/serviceconnect")
        console.log("mongodb connection success")
    } catch (error) {
        console.log(error)
    }
}
connect()
module.exports = connect