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
let selectedobj = userdata.find(o => o.username === usernamegiven);

console.log(selectedobj);

}
