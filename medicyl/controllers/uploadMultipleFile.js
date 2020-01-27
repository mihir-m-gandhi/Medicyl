require("dotenv").config();



const express=require("express");

const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer');
const path = require('path');

const imagesToPdf = require("images-to-pdf")


var fs =require('file-system');




var fl_names=[];




module.exports = (app)=>{

    var storage=multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'uploads')
        },
        filename: function(req,file,cb){
            fl=file.fieldname+'-'+Date.now()+path.extname(file.originalname)
            cb(null,fl)
        }
    })
    
    var upload = multer({
        storage: storage
    })
    
    
    app.get("/uploadMultipleFile",(req,res)=>{
        res.render("dashboard",{message:null});
    });

    app.post("/uploadMultipleFile",upload.array("myFiles",12),(req,res,next)=>{
        
        fs.mkdirSync(path.join(__dirname,'..','uploads','username'))
        const files=req.files;
        if (!files){
            const error= new Error("Please Choose Files");
            error.httpStstusCode = 400
            return next(error);
        }else{
            
            files.forEach(element => {
                var fl_string=  path.join(__dirname,'..','uploads','username',element['filename']);
                console.log(fl_string);
                fl_names.push(fl_string);

            });
            
             up(fl_names);
        }
        
        return res.redirect("/dashboard");
    
    })

}



async function up(fl_names){    
    fs.mkdirSync(path.join(__dirname,'..','downloads','username'));
    await imagesToPdf(fl_names, path.join(__dirname,"..","downloads","username","combined.pdf"));
    
    fs.rmdirSync(path.join(__dirname,'..','uploads','username'));

}

