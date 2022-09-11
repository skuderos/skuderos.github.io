//list of user objects
//accesslevels: 1 is admin, 2 is standard user, 3 is guest
const username_admin = {
username:"admin",
hash:"8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
accesslevel:"1",
email: "info@jvfr.nl",
};

const username_guest = {
username:"guest",
hash:"84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec",
accesslevel:"2",
email: "info@jvfr.nl",
};

const username_jordie = {
username:"jordie",
hash:"f9066e75accb6a1a76f742d9a0aa51aa54d305d7c366a36eb19e8a68d7b46a9c",
accesslevel:"2",
email: "info@jvfr.nl",
};

const username_MolnifyMattias = {
username:"MolnifyMattias",
hash:"16d9f4f575b294b62ab805f40cfa251cc9ee5013322326dd3aa39de0dd8b9fa1",
accesslevel:"2",
email: "hjortzberg@gmail.com",
};

//creation of combined array and pushing of each object into it
const userdata = [];

userdata.push(username_guest);
userdata.push(username_admin);
userdata.push(username_jordie);
userdata.push(username_MolnifyMattias);


//function that sets the current search key and retrieves the object
function loginsha256(){

  //get the current hash and username that is filled in
let usernamegiven = document.querySelector('[data-id="userlogin"]').value;
let hashgiven = sha256(document.querySelector('[data-id="pwlogin"]').value);

try{

  //get the expected hash for the given username
let selectedobj = userdata.find(o => o.username === usernamegiven);
let expectedhash=selectedobj.hash;
let accesslevellogin=selectedobj.accesslevel;

//check whether the hash matches the expected value. If it does, set the correct switches. If not, set switches for authentication fail OR using the error catch for the situation where the user isnt found in the database
if(expectedhash == hashgiven){
      //password is equal
  setValueForVariable("postauthenticationtext", 'TRUE');
  setValueForVariable("usernamepasted", usernamegiven);
  setValueForVariable("authenticated", 'TRUE');
  setValueForVariable("authentfailed", 'FALSE');
  setValueForVariable("usernotfound", 'FALSE');
  setValueForVariable("registernamealreadyfound", "FALSE");
  setValueForVariable("accesslevel", "2");
  setValueForVariable("registerfieldempty", 'FALSE');
} else{
      //password is apparently not equal
    setValueForVariable("authentfailed", 'TRUE');
    setValueForVariable("usernotfound", 'FALSE');
}

}

catch(err){
  //user is not found in database
  setValueForVariable("usernotfound", 'TRUE');
}

}

function sha256register() {

let givenpasswordreg = document.querySelector('[data-id="pwregist"]').value;
let givenusernamereg = document.querySelector('[data-id="userregist"]').value;
let givenemail = document.querySelector('[data-id="emailregist"]').value;
let hashHexreg=sha256(givenpasswordreg);

//find object where username tag is the given username
let selectedobj = userdata.find(o => o.username === givenusernamereg);
//try to get the username of that object. If it throws an error, goes to the catch function
try{
let selectedusername = selectedobj.username
//kijkt of het account al bestaat of niet
//username is already in database
    setValueForVariable("registernamealreadyfound", "TRUE");
} catch(err){

    //username is new, therefore registration is valid
    //first check if all fields are entered
if(givenpasswordreg && (givenusernamereg && (givenemail ))){
setValueForVariable("passwordcatchformail", hashHexreg);
setValueForVariable("usernamecatchformail", givenusernamereg);
setValueForVariable("emailcatchformail", givenemail);
setValueForVariable("accesslevel", "3");
performActionWithName("multipleregister");

setValueForVariable("registersuccesful", 'TRUE');
setValueForVariable("authenticated", 'TRUE');
setValueForVariable("authentfailed", 'FALSE');
setValueForVariable("usernotfound", 'FALSE');
setValueForVariable("registernamealreadyfound", "FALSE");
setValueForVariable("registerfieldempty", 'FALSE');
} else{
setValueForVariable("registernamealreadyfound", "FALSE");
setValueForVariable("registerfieldempty", 'TRUE');

}
}
}
