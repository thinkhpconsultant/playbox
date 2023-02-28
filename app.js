const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const conn = require("./model/local_connection");
const newRoute = require("./routes/route")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public")); 
app.set("view engine","ejs");

conn.connect(function(err){   //connecting databse with connect method
    if(err){
        console.log(err);
    }else{
        console.log("Database connected");
    } 
    conn.query(`select * from user`,(err,result)=>{
        if(err){
            return console.log(err);
        }
        return console.log(result)
    })
    
})
app.use("/",newRoute);



// app.post("/",function(req,res){
//     const userData = req.body;
//     const{role,username,password} = userData;

//     let query = "select * from user where email=?";
//     conn.query(query,username,function(err,result){
//     if(result[0] != null){
//         if(result[0].password === password && result[0].role === role){
//             res.redirect("/home")
//         }else{
//             res.redirect("/");
//         }
//     }else{
//         res.redirect("/");
//     }
    
//     });
// });

// app.get("/home",function(req,res){
//     res.render("home");
// })

// app.post("/",function(req,res){
//     let userData = req.body;
//     const {name,role,username, password} = userData 
//     let query = "Insert into user(first_name,role,email,password)VALUES?";
//     const values = [
//         [name,role,username,password]
//     ]
//     conn.query(query,[values],function(err,result){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(result);
//         }
//     })
// })


// let query = "select * from user where id =?";
// let name = "Tirth Bharodiya";

//         conn.query(query,1,function(err,result){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(result);
//             }
//         })
    


app.listen("3003",function(err){
    if(!err){
        console.log("Server is running on port 3000");
    }
})