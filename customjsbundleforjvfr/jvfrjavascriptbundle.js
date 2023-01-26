function setmapintdelay(){

setTimeout(setmapint, 6000);

}

function updatewindmarkersdelay(){

setTimeout(updatewindmarkers, 50);
setTimeout(updatewindmarkers, 250);

}


function confirmairfieldsbutton(){
//functie die de API calls uitvoert voor de vliegvelden en de resultaten ervan plakt in de excel

setValueForVariable('loadingfields','TRUE');
let departurefield = getValueForVariable('depfieldicao');
let destinationfield = getValueForVariable('destfieldicao');
let alternatefield = getValueForVariable('altfieldicao');

let linkstart = 'https://avwx.rest/api/station/';
let linktail = '?format=json&remove=&token=cfA4qlXgKfaRCbYyqFPv2bzDXSnAu6jLYaUxBL3SGF4';

let fullinkdep = linkstart+departurefield+linktail;
let fullinkdest = linkstart+destinationfield+linktail;
let fullinkalt = linkstart+alternatefield+linktail;

//fetch calls maken voor elke individuele link, en dan de JSON result stringifyen en plakken

fetch(fullinkdep).then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
  let jsondep = JSON.stringify(data);
  setValueForVariable('fieldinfodeparture',jsondep);

  fetch(fullinkdest).then(function (response) {
  	// The API call was successful!
  	return response.json();
  }).then(function (data) {
  	// This is the JSON from our response
    let jsondest = JSON.stringify(data);
    setValueForVariable('fieldinfodestination',jsondest);

    fetch(fullinkalt).then(function (response) {
    	// The API call was successful!
    	return response.json();
    }).then(function (data) {
    	// This is the JSON from our response
      let jsonalt = JSON.stringify(data);
      setValueForVariable('fieldinfoalternate',jsonalt);

//delay voor het verwijderen van de loader
var delayInMilliseconds = 3500; //3.5 seconds

setTimeout(() => {setValueForVariable('loadingfields','FALSE');setValueForVariable('airfieldselectioncompleted','TRUE'); }, delayInMilliseconds);

//catch for when there is an error.
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

});
});
}


function addnewaircraftform(){

setValueForVariable('newaircraftbuttonpressed','TRUE');
window.open("https://skuderos.github.io/new_aircraft_form.docx");
sendnewaircraftform();
}

function sendfilesbuttonpressed(){

setValueForVariable('sendfilesbuttonpressed','TRUE');
setValueForVariable('newaircraftbuttonpressed','FALSE');
performActionWithName("emailnewplanefilestome")

}

function updatewindmarkers(){
//grabbing current values from Excel
var rotatetextstart = 'rotate(';
var rotatetextend = '0deg)';
var windheadingoverall = getValueForVariable('windheadingoverall');
var windheadingoverallconc = rotatetextstart+windheadingoverall+rotatetextend;
    console.log(windheadingoverallconc)

var rwydepselected = getValueForVariable('rwydepselected');
var rwydepselectedconc = rotatetextstart+rwydepselected+rotatetextend;
var rwydestselected = getValueForVariable('rwydestselected');
var rwydestselectedconc = rotatetextstart+rwydestselected+rotatetextend;
var rwyaltselected = getValueForVariable('rwyaltselected');
var rwyaltselectedconc = rotatetextstart+rwyaltselected+rotatetextend;

var depcrossw = getValueForVariable('crosswdep');
var destcrossw = getValueForVariable('crosswdest');
var altcrossw = getValueForVariable('crosswalt');

// changing of orientation for each element in the 3 lines
const windamarker = document.getElementById('winda');
windamarker.style.transform = windheadingoverallconc;


const rwyamarker = document.getElementById('rwya');
rwyamarker.style.transform = rwydepselectedconc;

const windbmarker = document.getElementById('windb');
windbmarker.style.transform = windheadingoverallconc;

const rwybmarker = document.getElementById('rwyb');
rwybmarker.style.transform = rwydestselectedconc;

const windcmarker = document.getElementById('windc');
windcmarker.style.transform = windheadingoverallconc;

const rwycmarker = document.getElementById('rwyc');
rwycmarker.style.transform = rwyaltselectedconc;

//changing wind speed texts with current values
document.getElementById("departurewindspeed").textContent=depcrossw;
document.getElementById("destinationwindspeed").textContent=destcrossw;
document.getElementById("alternatewindspeed").textContent=altcrossw;

  console.log('updated windmarkers');
}

function navlogbutton(){

performActionWithName('Navlogfilegenerate')

}

function sendcontactbutton(){

performActionWithName('emaildeveloper')

}

function massbalancebutton(){

setValueForVariable("showmbcatch", "1")

}

function sendnewaircraftform(){

performActionWithName("emailnewplane");
console.info("if you're reading this, thanks for choosing JVFR :)")

}

function togglepassword() {
  var x = document.querySelector('[data-id="pwlogin"]');
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function togglepassword2() {
  var x = document.querySelector('[data-id="pwregist"]');
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
