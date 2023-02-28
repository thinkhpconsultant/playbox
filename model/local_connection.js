const mysql = require("mysql");

var conn = mysql.createConnection({ //Creating a connection with the database
    host:'sql946.main-hosting.eu',
    user:'u839608378_thinkhp',
    password:'ThinkDM001@',
    database:'u839608378_thinkhp_base'
})

module.exports = conn;