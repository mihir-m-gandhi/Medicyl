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


// const mongoose=require('mongoose');


// var userSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     contact: String,
//     dob: String,
//     age: String,
//     gender: String,
//     usertype: String,
//     height: String,
//     weight: String,
//     bloodgroup: String,
//     criticalinfo: String
// })


// var User = mongoose.model("User", userSchema);

var mongoose = require('mongoose');
var User = require('./user_model.js');

// mongoose.connect('mongodb://localhost/event-db');

module.exports = User;


module.exports=(app)=>{

    app.get("/signup",(req,res)=>{
        res.render("signup",{message:null});
        
    });


    
    app.post("/signup",async (req,res)=>{

        var fullname=req.body.full_name;
        var username=req.body.uname;
        var dob=req.body.dob;
        var gender=req.body.gender;
        var password=req.body.password;
        var cnf_pass=req.body.cnf_password;
        var contact=req.body.contact;
        const usertype="patient";
        

        var today = new Date();

        var birthDate = new Date(dob);

        var age = today.getFullYear() - birthDate.getFullYear();
        console.log(age);


        var height="";
        var weight="";
        var bloodgroup="";
        var criticalinfo="";
        var doctorlist=[];

        
        
        console.log(username,fullname,contact,dob,gender,usertype,height,weight,bloodgroup,criticalinfo,doctorlist)

        User.create({
            username,fullname,contact,dob,gender,usertype,height,weight,bloodgroup,criticalinfo,doctorlist
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
        console.log("Set Call to contract")
        console.log(response);


        return res.redirect("/")

        
    });



}



