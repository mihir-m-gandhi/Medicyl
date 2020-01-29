const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");

const crypto = require("crypto");
const secret = "KVNwPVFLdv9HHg9MwEgt";


const createIdentity = require("./create_identity");


const acc_abi=require("../contracts/accounts").acc_abi;
const acc_address=require("../contracts/accounts").acc_address;



// const abi=require("../family_tree_details").abi;
// const address=require("../family_tree_details").address;
// const byteCode=require("../family_tree_details").bytecode;
// const createIdentity=require("./create_identity");

require("dotenv").config();


var mongoose = require('mongoose');
var Doctor = require('./doctor_model.js');


module.exports = Doctor;



module.exports=(app)=>{

    app.get("/signup_doctor",(req,res)=>{
        res.render("signup_doctor",{message:null});
        
    });


    
    app.post("/signup_doctor",async (req,res)=>{

        var fullname=req.body.full_name;
        var username=req.body.uname;
        var gender=req.body.gender;
        var password=req.body.password;
        var cnf_pass=req.body.cnf_password;
        var contact=req.body.contact;
        var usertype=req.body.u_type;
        var specialization =req.body.specialization;
        var experience =req.body.exp;
        var hospital =req.body.hospital;

        var identity = createIdentity();
        console.log(identity);

        var patientlist=[];
        experience="3";
        console.log(username,fullname,contact,gender,usertype,specialization,experience,hospital,patientlist)

        Doctor.create({
            username,fullname,contact,gender,usertype,specialization,experience,hospital,patientlist
        })

        



        // Hash of password
        var salt= "sRALdWPM3jqJWqN97WW1";
        var hashpass = crypto.createHmac('sha256',secret).update(password).digest('hex');
        console.log("Hash: ",hashpass);
        

        // Encryption of password
        var mykey = crypto.createCipher('aes-128-cbc', salt );
        var mystr = mykey.update(hashpass, 'utf8', 'hex');
        mystr += mykey.final('hex');

        console.log("Encryption of the hashed password",mystr);


        //Decryption of password
        var mykey1 = crypto.createDecipher('aes-128-cbc', salt);
        var mystr1 = mykey1.update(mystr, 'hex', 'utf8');
        mystr1 += mykey1.final('utf8');

        console.log("Decryption of the password: ",mystr1); 


        var identity = createIdentity();
        console.log(identity);

        var newPublicKey = identity.publicKey;
        var newCompressed = ethCrypto.publicKey.compress(newPublicKey);

        var newPrivateKey = identity.privateKey;

        console.log(newPrivateKey)
        
        // Converting private key to string
        var strPKey = newPrivateKey.toString();

        console.log(strPKey)
        


        // Encryption Code of private key
        
        var mypkey = crypto.createCipher('aes-128-cbc', salt );
        
        console.log("Private Key",typeof(newPrivateKey));
        var mypstr = mypkey.update(strPKey, 'utf8', 'hex');
        console.log(mypstr)
        mypstr += mypkey.final('hex');

        console.log("Encryption of Private Key",mypstr);


        // // Decryption Code for private key 
        var mypkey1 = crypto.createDecipher('aes-128-cbc', salt);
        var mypstr1 = mypkey1.update(mypstr, 'hex', 'utf8');
        mypstr1 += mypkey1.final('utf8');

        mypstr1.toString(16);

        console.log("Decryption of the private key: ",mypstr1); 


        console.log(mypstr.length);



        identity.compressed=newCompressed;
        
        // Web3 provider setup
        const provider = new HDwalletprovider(
            process.env.PRIVATE_KEY,
            process.env.ROPSTEN_INFURA
        );
        
        const web3=new Web3(provider);

        if (web3.currentProvider !== 'undefined'){
            console.log("Provider is set");
        }
        
        const contract=new web3.eth.Contract(acc_abi,acc_address);

        // Set call to contract
        const response= await contract.methods.set(username,mypstr,mystr).send({
             from:"0x1793A52C3B7b555f37628a0A03E5239d79353823"
        });
        console.log("Set Call to contract");
        console.log(response);

        console.log("Writing data to the file");
        


        //writing to a file
        var path=__dirname+"/"+"/UserData/"+identity.compressed+".txt";
     
        var data={
            username:username,
            Private_Key:newPrivateKey,
            Public_Key:newPublicKey
        };

        console.log("data created")
 
        fs.writeFileSync(path,JSON.stringify(data),'utf8',(err)=>{
            console.log(err);
        });

        console.log("file created");

        // download file
        // res.setHeader('Content-disposition', 'attachment; filename=' + identity.address+".txt");
        res.download(path,identity.compressed+'.txt',(err)=>{
            if(err){
                console.log(err);
            }else{
            console.log("File Downloading");     
            res.render("index",{message:"Please Keep Downloaded Files SAFE"});
            
            }
        });
       
        
    });





}



