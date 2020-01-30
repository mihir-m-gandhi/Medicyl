require("dotenv").config();

const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
var Document = require("./document_model");
const session=require("express-session");
const fs = require('fs');
const right_abi=require("../contracts/rights").right_abi;
const right_address=require("../contracts/rights").right_address;
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
const https = require('https');

const path = require('path');

module.exports=(app)=>{

    app.get("/dashboard",(req,res)=>{

        console.log("Username",req.session.username);

        Document.find({username:req.session.username},function(err,docs){
            console.log(err,docs)
            if (err){
                console.log("Not found in Document");
        
            }else{
                console.log("SEARCH Document RESULTS");
                console.log(docs)
                
                res.render("dashboard",{DocList:docs});                 
            }
        });

       
        
    });


    app.post("/dashboard",async (req,res)=>{
        var docn=req.body.docn;

             // Web3 provider setup
            const provider = new HDwalletprovider(
                process.env.PRIVATE_KEY,
                process.env.ROPSTEN_INFURA
            );
            
            const web3=new Web3(provider);

            if (web3.currentProvider !== 'undefined'){
                console.log("Provider is set");
            }
            
            const contract=new web3.eth.Contract(right_abi,right_address);

            
            var ipfshash = "";
            var right = "";
            var policy_count= await contract.methods.getUserPolicyCount(req.session.username).call();
            console.log(policy_count);

            for(var i=policy_count-1;i >= 0;i--){
                const policy= await contract.methods.policy(req.session.username,i).call();
                console.log(policy);
                console.log(policy.docname);
                if(policy.doc.match(docn)){
                    if (policy.rights.match('revoke')){
                        break;
                    }
                    ipfshash ="https://ipfs.io/ipfs/"+ policy.docname;
                    console.log("Here", ipfshash)
                    right = policy.rights;
                    console.log(ipfshash,right);      
                    // return res.render("pdf2",{message:[docname,ipfshash,right]});
                    break;
                }
            }
        
        //This hash is returned hash of addFile router.
        const file = fs.createWriteStream("./uploads/downloaded.pdf");
        
        const request = https.get(ipfshash, function(response) {
          response.pipe(file);
        });
        
        var exec = require('child_process').exec;
        // var cmd = 'qpdf --decrypt --password=publickey ./uploads/encrypted.pdf ./uploads/decrypted.pdf';
        // exec(cmd, function (err){
        //     if (err){
        //         console.error('Error occured: ' + err);
        //     }else{
        //         console.log('PDF dencrypted :)');
        //     }
        // });
        console.log("Decrypted",ipfshash)
        // fs.rmdirSync(path.join(__dirname,"..","uploads"));
        // fs.mkdir(path.join(__dirname,"..","uploads"));
        return res.render("pdf2",{message:"Successful",docn:docn,ipfshash:ipfshash,right:right});

    })



}