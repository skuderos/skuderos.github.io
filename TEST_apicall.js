function apicalldeparture(){

//api call for station information through avwx

let linkstart = 'https://avwx.rest/api/station/';
let icaogiven = getValueForVariable('depfieldicao');
let linktail = '?format=json&remove=&token=cfA4qlXgKfaRCbYyqFPv2bzDXSnAu6jLYaUxBL3SGF4';

let fullink = linkstart+icaogiven+linktail;

console.log(fullink);

fetch(fullink).then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
  let parsabledata = JSON.stringify(data);
  setValueForVariable('fieldinfodeparture',parsabledata)
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

console.log('turns out it worked, yay')
}
