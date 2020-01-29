require("dotenv").config();

var express=require('express');

const signup=require("./signups");


module.exports=(app)=>{

    app.get("/adddoctor",(req,res)=>{
        User.find({},function(err,users){
            if (err){
                console.log(err);
            }else{
                console.log(users);
            }
        })    
    });
}