require("dotenv").config();

var express=require('express');
var mongoose = require('mongoose');
var User = require('./user_model.js');



module.exports=(app)=>{


    app.get("/adddoctor",(req,res)=>{
        User.find({},function(err,users){
            if (err){
                console.log(err);
            }else{
                res.render("add_doctor",{userList:users});
                console.log(users);
            }
        })    
    });

    app.post("/adddoctor",(req,res)=>{
    //     User.find({},function(err,users){
    //         if (err){
    //             console.log(err);
    //         }else{
    //             console.log(users);
    //         }
    //     })  
    //     var username=req.body.search_doctor;
    //     console.log(username);
    //     User.findOne({username:username},function(err,users){
    //         if (err){
    //             console.log(err);
    //         }else{
    //             res.render("add_doctor",{userInfo:users, userList:users});
    //             console.log("SEARCH RESULTS");
    //             console.log(users);
    //         }
    //     })  
    });
}



