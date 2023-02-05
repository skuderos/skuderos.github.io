function setmapint(){

//declare waypoint array waar later de coordinaten in geduwd worden

 const waypointlatlng = []
  window.varwaypointlatlng=waypointlatlng;

//Initialize map with satellite layer and openstreetmap layer, and layercontrol

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var esrimap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'ESRI',
    useCache: true,
crossOrigin: true
});

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
  useCache: true,
crossOrigin: true

});

var thundertransport = L.tileLayer('https://b.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=a922d740113b40cf80a36f6aabe5affc',{
useCache: true,
crossOrigin: true
});

//declaring every tile source for openAIP and personal server

var aeromap = L.tileLayer('https://api.tiles.openaip.net/api/data/airspaces/{z}/{x}/{y}.png?apiKey=4210624c80f9b86965249a64adc4b2df',{
  useCache: true,
	crossOrigin: true
});

var homemap = L.tileLayer('https://www.jvfrtilehostingserver.xyz/ehaa_256/{z}/{x}/{y}.png',{
  useCache: true,
	crossOrigin: true
});

var aeroreporting_points = L.tileLayer('https://api.tiles.openaip.net/api/data/reporting-points/{z}/{x}/{y}.png?apiKey=4210624c80f9b86965249a64adc4b2df',{
  useCache: true,
	crossOrigin: true
});

var aeroairports = L.tileLayer('https://api.tiles.openaip.net/api/data/airports/{z}/{x}/{y}.png?apiKey=4210624c80f9b86965249a64adc4b2df',{
  useCache: true,
	crossOrigin: true
});

//declaring the actual map object and initializing it with default layers

window.map = L.map('map', {
fullscreenControl: true,
center: [52.2414287, 6.0524422],
    zoom: 14,
    layers: [thundertransport, homemap, aeroairports]
});

//declaring selection for basemaps and overlaymaps, and which to put in there

var baseMaps = {
  "Simple":thundertransport,
 "Satellite": esrimap
};

var overlayMaps ={
    "VFR map": homemap,
    "Airspaces (alt)": aeromap,
    "Reporting points":aeroreporting_points,
    "Airfields": aeroairports,
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

//leaflet draw controls vanaf hier

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var waypointmarkerpng = L.icon({
    iconUrl: 'https://skuderos.github.io/images/waypointmarker.png',
    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [12.5, 12.5], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

var drawControl = new L.Control.Draw({
position: 'topleft',
draw: {

polygon: false,
rectangle: false,
marker: {
 icon: waypointmarkerpng,
 opacity: 0.8,

},
polyline: {
                shapeOptions: {
                    color: '#c600d4',
                    opacity: 0.8,
lineCap: 'round',
lineJoin: 'round'
                }
            },

circlemarker: false,
circle: false,
},
edit: {
featureGroup: drawnItems,
}
});
map.addControl(drawControl);


// functie die daadwerkelijk dingen op de kaart tekent en bij een polyline de coordinaten in een array opslaat

function createpolylineroute (e){
  console.log('object drawn')
	var type = e.layerType,
	layer = e.layer;
	if (type === 'polyline') {
    waypointlatlng.push(e.layer.getLatLngs());

//section for placing markers at corners

for (var i=0; i<waypointlatlng.length; i++) {

   var latlonmarkers = waypointlatlng[i][0];
  var markeratbounds = new L.Marker(latlonmarkers, {icon: waypointmarkerpng});
}
//section for connecting to the basseline calculation of routes etc.

    console.log(waypointlatlng);
    setValueForVariable("waypointcoordinates", waypointlatlng);
    window.varwaypointlatlng=waypointlatlng;
 }

drawnItems.addLayer(layer);

}

map.on('draw:created', createpolylineroute);

map.on('draw:deleted', onlayerdelete);

map.on('draw:editvertex', function(e) {
    for (thisLayer in e.target._layers) {
        if (e.target._layers.hasOwnProperty(thisLayer)) {
            if (e.target._layers[thisLayer].hasOwnProperty("edited")) {
                console.log(e.target._layers[thisLayer]);

                // the updated Polyline array points are here:
                newPolyLatLngArray = e.target._layers[thisLayer].editing.latlngs[0];

//clear out the waypoint array and then populate it with the edited values
waypointlatlng.length = 0;

waypointlatlng.push(newPolyLatLngArray);

setValueForVariable("waypointcoordinates", waypointlatlng);
window.varwaypointlatlng=waypointlatlng;
console.log(waypointlatlng);

            }
        }
    };
});


function onlayerdelete(){

waypointlatlng.length = 0;

setValueForVariable("waypointcoordinates", waypointlatlng);
window.varwaypointlatlng=waypointlatlng;

console.log("deleted handler fired")
console.log(waypointlatlng);

}

// add scale to map
L.control.scale({ maxWidth: 150 }).addTo(map);

//add GPS buttons
var firstbutton = L.easyButton('<img src="https://skuderos.github.io/planeicon.png" style="height:15px">', function(btn, map){
  initiategpscontrols()
},'toggle GPS, if your device supports it.').setPosition('topright').addTo(map);

 var secondbutton = L.easyButton('<img src="https://skuderos.github.io/planeicon.png" style="height:15px">', function(btn, map){
    helloPopup.setLatLng(map.getCenter()).openOn(map);
},'Change active waypoint (previous)').setPosition('topright').addTo(map);

   var thirdbutton = L.easyButton('<img src="https://skuderos.github.io/planeicon.png" style="height:15px">', function(btn, map){
    helloPopup.setLatLng(map.getCenter()).openOn(map);
},'Change active waypoint (next)').setPosition('topright').addTo(map);


//screenshotter section
L.simpleMapScreenshoter({
    // custom screenshot name
    screenName: function () {
        return new Date().toDateString()
    }
}).addTo(map);

//end of function setmapint
}

function initiategpscontrols() {

  //declare counting variable that keeps track of which waypoint is Activate
var waypointsCompleted = 0;

// custom aircraft GPS marker section
          var aircraftmarkerpng = L.icon({
              iconUrl: 'https://skuderos.github.io/images/AircraftIconBordered.png',
              iconSize:     [63, 50], // size of the icon
              iconAnchor:   [32, 25], // point of the icon which will correspond to marker's location
              popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
          });

//placing the marker with a custom rotation
  var gpsMarkerLayerGroup = L.layerGroup()
  map.addLayer(gpsMarkerLayerGroup)
        var locationmarker =  L.marker([51.5, -0.09], {icon: aircraftmarkerpng, rotationAngle: 0})
gpsMarkerLayerGroup.addLayer(locationmarker)

//check if headingloop is already active.
var gpsIsRunning = false;
if (gpsIsRunning = false){
  //start the loop
  var gpsloopid = setInterval(gpsloop, 100);
  var headingloopid = setInterval(headingloop, 50);
  console.log('started gpsloop')
  var gpsIsRunning = true;
} else{
  clearInterval(gpsloopid);
  clearInterval(headingloopid);
    console.log('stopped gpsloop')
  var gpsIsRunning = false;
}

function headingloop(){
  // Obtain a new *world-oriented* Full Tilt JS DeviceOrientation Promise
  var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });

  // Wait for Promise result
  promise.then(function(deviceOrientation) { // Device Orientation Events are supported

      // Get the current *screen-adjusted* device orientation angles
      var currentOrientation = deviceOrientation.getScreenAdjustedEuler();

      // Calculate the current compass heading that the user is 'looking at' (in degrees)
      var compassHeading = 360 - currentOrientation.alpha;
      var compassHeadingRounded = Math.round(compassHeading);

      // Do something with `compassHeading` here...
      const element = document.getElementById("currentheadingnumber");
      element.innerHTML = compassHeadingRounded;
window.compassHeadingRounded = compassHeadingRounded;

  })
}


function gpsloop(){
 //nestling to let the whole function be loopable
  // get current location

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(getCurrentGpsPosition);
}
else {
  console.log("Geolocation is not supported by this browser.");
}
}

function getCurrentGpsPosition(position) {

  //get current location
var latitudecurrent = position.coords.latitude
var longitudecurrent = position.coords.longitude;
var LatLngcurrentgps = [];
LatLngcurrentgps.push(latitudecurrent, longitudecurrent);

// get waypoint coordinates, and snip to the current waypoint lat lng

var allwaypointshere = window.varwaypointlatlng;

try{
const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];
var currentwaypointcoords1stsnip = nthElement(allwaypointshere, 0);
var currentwaypointcoords = nthElement(currentwaypointcoords1stsnip, waypointsCompleted);

var latitudewp = currentwaypointcoords.lat;
var longitudewp = currentwaypointcoords.lng;

  //calculate distance between waypoint coordinates and current coordinates
  //using haversine fomula
  var R = 6371; // Radius of the earth in km
var dLat = deg2rad(latitudecurrent-latitudewp);  // deg2rad below lat2 is current
var dLon = deg2rad(longitudecurrent-longitudewp);
var haversine =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(deg2rad(latitudewp)) * Math.cos(deg2rad(latitudecurrent)) *
Math.sin(dLon/2) * Math.sin(dLon/2)
;
var cHaversine = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1-haversine));
var distanceToNextwp = R * cHaversine; // Distance in km

//calculate heading between waypoint and current getCurrentPosition
startLat = toRadians(latitudecurrent);
startLng = toRadians(longitudecurrent);
destLat = toRadians(latitudewp);
destLng = toRadians(longitudewp);

yValue = Math.sin(destLng - startLng) * Math.cos(destLat);
xValue = Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
brng = Math.atan2(yValue, xValue);
brng = toDegrees(brng);
var brgntranslated = (brng + 360) % 360;
var brngrounded = Math.round(brgntranslated);

//place resulting heading into the element
const element = document.getElementById("nextheadingnumber");
element.innerHTML = brngrounded;
} //end of try

catch{
//does nothing, except skip the try block if there is no route selected
}

finally{

//updating the current aircraft marker
  locationmarker.setRotationAngle(compassHeadingRounded)
  locationmarker.setLatLng(LatLngcurrentgps);


//check whether distance is smaller than maximum stated distance.
//if yes, increase completed waypoints by 1
var maximumDistance = 1.5;   // in km
                if (maximumDistance > distanceToNextwp) {
                console.log("waypoint reached");
                waypointsCompleted++;
                }

} //end of finally

//end of getCurrentGpsPosition
              }

//convert degrees to radian
function deg2rad(deg) {
      return deg * (Math.PI/180)
      }

function toRadians(degrees) {
      return degrees * Math.PI / 180;
      };

// Converts from radians to degrees.
function toDegrees(radians) {
      return radians * 180 / Math.PI;
      }

//end of initiategpscontrols
}
