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

const username_jordie = {
username:"jordie",
hash:"f9066e75accb6a1a76f742d9a0aa51aa54d305d7c366a36eb19e8a68d7b46a9c",
accesslevel:"2",
};

//creation of combined array and pushing of each object into it
const userdata = [];

userdata.push(username_guest);
userdata.push(username_admin);
userdata.push(username_jordie);


//function that sets the current search key and retrieves the object
function loginsha256(){

  //get the current hash and username that is filled in
let usernamegiven = document.querySelector('[data-id="userlogin"]').value;
let hashgiven = sha256(document.querySelector('[data-id="pwlogin"]').value);

try{

  //get the expected hash for the given username
let selectedobj = userdata.find(o => o.username === usernamegiven);
let expectedhash=selectedobj.hash;

//check whether the hash matches the expected value. If it does, set the correct switches. If not, set switches for authentication fail OR using the error catch for the situation where the user isnt found in the database
if(expectedhash == hashgiven){
      //password is equal
  setValueForVariable("postauthenticationtext", 'TRUE');
  setValueForVariable("authenticated", 'TRUE');
  setValueForVariable("authentfailed", 'FALSE');
  setValueForVariable("usernotfound", 'FALSE');
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
