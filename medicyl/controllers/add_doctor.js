require("dotenv").config();

var express=require('express');
var session=require('express-session');
var mongoose = require('mongoose');
var Doctor = require('./doctor_model.js');


const signup=require("./signups");


module.exports=(app)=>{

    doctorlist = []
    app.get("/adddoctor",(req,res)=>{
        var username = "doctor2";
        console.log(username,"backend");
        Doctor.findOne({username:username},function(err,doctor){
            if (err){
                console.log(err);

            }else{
                console.log(doctor);
                return doctor;                
            }
        })  
        //res.render("add_doctor");

        // User.find({},function(err,users){
        //     if (err){
        //         console.log(err);
        //     }else{
                //res.render("add_doctor",{doctorlist:doctorlist});
                //console.log(users);
            // }
        // })    
    });

    // app.post("/adddoctor",(req,res)=>{
    //     User.find({},function(err,users){
    //         if (err){
    //             console.log(err);
    //         }else{
    //             console.log(users);
    //         }
    //     })  
        // var username=req.body.search_doctor;
        // console.log(username);
    //     User.findOne({username:username},function(err,users){
    //         if (err){
    //             console.log(err);
    //         }else{
    //             res.render("add_doctor",{userInfo:users, userList:users});
    //             console.log("SEARCH RESULTS");
    //             console.log(users);
    //         }
    //     })  
    // username = req.session.username
    // User.findOne({username:username},function(err,users){
    //     console.log(err,users)
    //     if (err){
    //         console.log("Not found in User");
    
    //     }else{
    //         console.log("SEARCH RESULTS");
    //         console.log(users)
    //         if (users != null){
    //             doctorlist=users.doctorlist;
    //             console.log("doctor list",doctorlist);

    //         }
             
    //     }
    // });
    // res.render("add_doctor",{doctorlist:doctorlist});
    // });
}



