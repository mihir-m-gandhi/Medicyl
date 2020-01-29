require("dotenv").config();

const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const express=require("express");
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer');
const path = require('path');

const imagesToPdf = require("images-to-pdf")


var fl_names=[];

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})




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


    
    // //Getting the uploaded file via hash code.
    // app.get('/getfile', function(req, res) {
        
    //     //This hash is returned hash of addFile router.
    //     const validCID = 'HASH_CODE'
    
    //     ipfs.files.get(validCID, function (err, files) {
    //         files.forEach((file) => {
    //           console.log(file.path)
    //           console.log(file.content.toString('utf8'))
    //         })
    //       })
    
    // })

    app.post("/uploadMultipleFile",upload.array("myFiles",12),(req,res,next)=>{
        const files=req.files;
        if (!files){
            const error= new Error("Please Choose Files");
            error.httpStstusCode = 400
            return next(error);
        }
        var fl_string = "";
        files.forEach(element => {
          fl_string=  path.join(__dirname,'..','//uploads//',element['filename']);
          console.log(fl_string);
          fl_names.push(fl_string);
        });
        // console.log("File Names after path join :",fl_names);
        
         up(fl_names);
        //Reading file from computer
        var exec = require('child_process').exec;
        var cmd = 'qpdf --encrypt publickey publickey 40 -- ./uploads/combined.pdf ./uploads/encrypted.pdf';

        exec(cmd, function (err){
            if (err){
                console.error('Error occured: ' + err);
            }else{
                console.log('PDF encrypted :)');
            }
        });
        fl_string=  path.join(__dirname,'..','//uploads//encrypted.pdf');
        let testFile = fs.readFileSync(fl_string);
        //Creating buffer for ipfs function to add file to the system
        let testBuffer = new Buffer(testFile);

         ipfs.files.add(testBuffer, function (err, file) {
            if (err) {
              console.log(err);
            }
            console.log(file)
            console.log("Mihir")
          });
        return res.redirect("/dashboard");
        
        
    
    })

}



function up(fl_names){
    console.log("in async");
    imagesToPdf(fl_names, path.join(__dirname,"..","uploads","combined.pdf"));
}

// fs.mkdirSync(path.join(__dirname,'..','downloads','username'));
// await imagesToPdf(fl_names, path.join(__dirname,"..","downloads","username","combined.pdf"));
    
// fs.rmdirSync(path.join(__dirname,'..','uploads','username'));