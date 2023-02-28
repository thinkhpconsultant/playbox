const express = require("express");
const bodyParser = require("body-parser");
const conn = require("../model/local_connection")
const app = express();


let isValid = function (value) { //Validation of data
    if (value == null || value.length < 6) {
        return false;
    } else {
        return true;
    }
}

let isValidRole = function (value) {
    if (value == null) {
        return false;
    } else {
        return true;
    }
}


const registerUser = async (req, res) => {
    const userData = req.body;
    const { name, role, username, password } = userData;
    if (false) {
        console.log("Invalid");
        res.status(500).render("signup");
    }
    else {
        try {
            let query = "Insert into user(first_name,role,email,password)VALUES?"; //Insert query 
            let values = [        
                [name, role, username, password] //Values which we wants to insert by order
            ];
            console.log(values);
            conn.query(query, [values], function (err, result) { // Fire a Query
                if (!err) {
                    res.redirect("/loginuser")
                } else {
                    console.log(err)
                }
            });
        }
        catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }
}

const loginUser = (req, res) => {
    const userData = req.body;
    const { role, username, password } = userData;

    if (false) {
        res.status(400).send("Invalid");
    } 
    else {

        try {
            let query = "SELECT * FROM user WHERE email=?"; //Finding the data into the databse query
            conn.query(query, username, function (err, result) {
                console.log(result);
                if (result[0] != null) { //if result is not null
                    if (result[0].password === password && result[0].role === role) { //if result is not null then compare password and role 
                        res.status(201).redirect("/home");
                    } else {
                        res.status(404).render("login");
                    }
                } else {
                    res.status(404).render("login");
                }
            })
        } 
        
        catch (err) { //IF some error occured from the server
            res.status(500).send("Internal Server");
        }
    }

}
module.exports = { registerUser, loginUser };