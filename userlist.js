var user1 = {};
user1.name = "admin";
user1.hash = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

var user2 = {};
user2.name= "guest";
user2.hash= "84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec";

let userscombined = [user1 ,user2];

function userreadtest(){
var usernamegiven = "admin"
console.log(user1)
console.log(usernamegiven);
var foundhash = JSON.parse(userscombined.usernamegiven)
console.log(foundhash)
}
