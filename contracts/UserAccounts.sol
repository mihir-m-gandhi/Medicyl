pragma solidity^0.4.0;

contract Accounts{
 
 struct acc{
   string secret;
   string passhash;
 }
 
 mapping ( string  => acc)  AccMap;
 
 function get_secret(string username) view returns(string){

   return (AccMap[username].secret);
 }
   
 function get_passhash(string username) view returns(string){

   return (AccMap[username].passhash);
 }
   
 function set(string username,string secret,string passhash) public{
     
   AccMap[username]=acc(
       secret,
       passhash
   );
 }

}