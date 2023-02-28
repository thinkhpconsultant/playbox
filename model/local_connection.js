const mysql = require("mysql");

var conn = mysql.createConnection({ //Creating a connection with the database
    host:'locolhost',
    user:'root',
    password:'',
    database:''
})

module.exports = conn;