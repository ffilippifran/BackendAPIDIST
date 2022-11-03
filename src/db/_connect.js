const mongoose = require('mongoose');
const environment = require("../config/enviroment");

function _connectDB(){
    
    mongoose.connect(process.env.DB,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(
            () => {
                console.log("connection db ready to use");
            },
            (err) => {
                console.log("Connection error - ", err);
            },
        )
    
    mongoose.Promise = global.Promise;
}
module.exports = _connectDB;