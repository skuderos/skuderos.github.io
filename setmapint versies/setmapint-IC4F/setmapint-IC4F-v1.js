function setmapint(){

//declare waypoint array waar later de coordinaten in geduwd worden

 const waypointlatlng = []

//Initialize map with satellite layer and openstreetmap layer, and layercontrol


var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

var thundertransport = L.tileLayer('https://b.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=a922d740113b40cf80a36f6aabe5affc'
);

//declaring every tile source for openAIP

//declaring the actual map object and initializing it with default layers

var map = L.map('map', {
fullscreenControl: true,
center: [52.2414287, 6.0524422],
    zoom: 12,
    layers: [thundertransport]
});

//declaring selection for basemaps and overlaymaps, and which to put in there

var baseMaps = {
  "Simple":thundertransport
};

var overlayMaps ={
//currently empty, but might add something later for rexisting pilot sites or something like that

};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

//leaflet draw controls vanaf hier

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var locationmarkerpng = L.icon({
    iconUrl: 'https://skuderos.github.io/images/steiconsmall.png',
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
 icon: locationmarkerpng,
 opacity: 0.8,

},
polyline: false,
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
	if (type === 'marker') {
    waypointlatlng.push(e.layer.getLatLngs());

//section for connecting to the baseline calculation of routes etc.

    console.log(waypointlatlng);
    setValueForVariable("waypointcoordinates", waypointlatlng);
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

console.log(waypointlatlng);

            }
        }
    };
});


function onlayerdelete(e){

  var type = e.layerType;
  if (type === 'polyline') {

waypointlatlng.length = 0;

setValueForVariable("waypointcoordinates", waypointlatlng);

console.log("deleted handler fired")
console.log(waypointlatlng);

}
}



// add scale to map
L.control.scale({ maxWidth: 150 }).addTo(map);

//end of function setmapint
}
