//list of user objects
const username_admin = {
username:"admin",
hash:"8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
accesslevel:"1",
};

const username_guest = {
username:"guest",
hash:"84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec",
accesslevel:"2",
};

//creation of combined array and pushing of each object into it
const userdata = [];

userdata.push(username_guest);
userdata.push(username_admin);


//function that sets the current search key and retrieves the object
function userreadtest(){

  //get the current hash and username that is filled in
let usernamegiven = document.querySelector('[data-id="userlogin"]').value;
let hashgiven = sha256(document.querySelector('[data-id="pwlogin"]').value);
console.log(usernamegiven);
console.log(hashgiven);

try{

  //get the expected hash for the given username
let selectedobj = userdata.find(o => o.username === usernamegiven);
let expectedhash=selectedobj.hash;
console.log(expectedhash);
console.log(hashgiven);

//check whether the hash matches the expected value. If it does, set the correct switches. If not, set switches for authentication fail OR using the error catch for the situation where the user isnt found in the database
if(expectedhash == hashgiven){
  setValueForVariable("postauthenticationtext", 'TRUE');
  setValueForVariable("authenticated", 'TRUE');
  setValueForVariable("authentfailed", 'FALSE');
  setValueForVariable("usernotfound", 'FALSE');
  console.log("it's equal!");
} else{
  console.log("it's not equal");
    setValueForVariable("authentfailed", 'TRUE');
    setValueForVariable("usernotfound", 'FALSE');
}

}

catch(err){
console.log("username not found in database");
  setValueForVariable("usernotfound", 'TRUE');
}

}
