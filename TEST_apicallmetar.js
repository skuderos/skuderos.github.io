function apicallmetardep(){

//api call for station information through avwx, to get coordinates for closest search

let linkstart = 'https://avwx.rest/api/station/';
let icaogiven = getValueForVariable('depfieldicao');
let linktail = '?format=json&remove=&token=cfA4qlXgKfaRCbYyqFPv2bzDXSnAu6jLYaUxBL3SGF4';

let fullink = linkstart+icaogiven+linktail;

fetch(fullink).then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
let lat = data.latitude;
let lon = data.longitude;
let latlon = lat+','+lon;
console.log(latlon);


//vanaf hier de search for closes reporting weather station
let linkstart2 = 'https://avwx.rest/api/station/near/';
let depcoords = latlon;
let linktail2 = '?n=1&airport=false&reporting=true&format=json&token=cfA4qlXgKfaRCbYyqFPv2bzDXSnAu6jLYaUxBL3SGF4';

let fullink2 = linkstart2+depcoords+linktail2;

console.log(fullink2);

fetch(fullink2).then(function (response2) {
	// The API call was successful!
	return response2.json();
}).then(function (data2) {
	// This is the JSON from our response
console.log(data2);



}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

console.log('turns out it worked, yay');
});
}
