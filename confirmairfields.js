function confirmairfieldsbutton(){

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

setTimeout(function() {
setValueForVariable('loadingfields','FALSE');
}, delayInMilliseconds);

//catch for when there is an error.
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

});
});
}
