require("dotenv").config();
require("dotenv").config();

const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const express=require("express");
const session=require("express-session");
const bodyParser = require('body-parser');
const app=express();

const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const right_abi=require("../contracts/rights").right_abi;
const right_address=require("../contracts/rights").right_address;



app.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer');
const path = require('path');

const imagesToPdf = require("images-to-pdf")


var fl_names=[];

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

var mongoose = require('mongoose');
var Document = require('./document_model.js');
//module.exports = Document;

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
    
    
    app.get("/addrecord",(req,res)=>{
        res.render("add_record",{message:null});
    });




    app.post("/addrecord",upload.array("myFiles",12),async (req,res,next)=>{
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
        setTimeout(function(){
            console.log("waiting file uploading")
        },3000);
        fl_string=  path.join(__dirname,'..','//uploads//encrypted.pdf');
        let testFile = fs.readFileSync(fl_string);
        //Creating buffer for ipfs function to add file to the system
        let testBuffer = new Buffer(testFile);

         ipfs.files.add(testBuffer, function (err, file) {
            if (err) {
              console.log(err);
            }
            else{
            console.log("in else");
            var name=req.body.name;
            var username=req.session.username;
            var type=req.body.type;
            var description=req.body.description;
            var date=req.body.date;
            
            const myData = {
                username,name,type,description,date
            }
            
            var data = Document(myData);

            data.save(function(err){
                if (err){
                    console.log("Error in submission");
                }else{
                    console.log("Form Submitted Successfully");
                    // return res.redirect("/dashboard")
                }

            })
            console.log(file)

            const provider = new HDwalletprovider(
                process.env.PRIVATE_KEY,
                process.env.ROPSTEN_INFURA
            );


             
            const web3=new Web3(provider);
    
            if (web3.currentProvider !== 'undefined'){
                console.log("Provider is set");
            }
            
            const contract=new web3.eth.Contract(right_abi,right_address);
            contract.methods.AddPolicy(req.session.username,(file[0].hash),name,"owner").send({
                    from:"0x1793A52C3B7b555f37628a0A03E5239d79353823"
                });
            
                setTimeout(function(){
                    console.log("sleeping for 3sec")
                },300);
            return res.redirect("/dashboard")


            }
          });
        ;
        
        
    
    })

}

async function up(fl_names){
    console.log("in async");
    await imagesToPdf(fl_names, path.join(__dirname,"..","uploads","combined.pdf"));
}


