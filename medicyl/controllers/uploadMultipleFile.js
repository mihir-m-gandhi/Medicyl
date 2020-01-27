require("dotenv").config();



const express=require("express");

const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer');
const path = require('path');



module.exports = (app)=>{

    var storage=multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'uploads')
        },
        filename: function(req,file,cb){
            cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
        }
    })
    
    var upload = multer({
        storage: storage
    })
    
    
    app.get("/uploadMultipleFile",(req,res)=>{
        res.render("dashboard",{message:null});
    });

    app.post("/uploadMultipleFile",upload.array("myFiles",12),(req,res,next)=>{
        const files=req.files;
        if (!files){
            const error= new Error("Please Choose Files");
            error.httpStstusCode = 400
            return next(error);
        }
        console.log(files);
 
        return res.redirect("/dashboard");
        
    })
    
}


