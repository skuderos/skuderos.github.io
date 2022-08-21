function setmapint(){

//declare waypoint array waar later de coordinaten in geduwd worden

                         const waypointlatlng = []

//Initialize map with satellite layer and openstreetmap layer, and layercontrol

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var esrimap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'ESRI'
});

var aeromap = L.tileLayer('http://77.169.232.101:8080/ehaa_256/map/#{z}/{y}/{x}', {
    maxZoom: 11,
});

var map = L.map('map', {
fullscreenControl: true,
center: [52.2414287, 6.0524422],
    zoom: 14,
    layers: [osm]
});

var baseMaps = {
    "VFR map":aeromap,
    "Map": osm,
    "Satellite": esrimap

};

var layerControl = L.control.layers(baseMaps).addTo(map);

//leaflet draw controls vanaf hier

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
position: 'topleft',
draw: {

polygon: false,
rectangle: false,
marker: false,
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

                function gerard (e){
                console.log('gerard called')
			               var type = e.layerType,
				layer = e.layer;

			if (type === 'polyline') {


                                             waypointlatlng.push(e.layer.getLatLngs());

console.log(waypointlatlng);

setValueForVariable("waypointcoordinates", waypointlatlng);


                                             }

			drawnItems.addLayer(layer);

		}

		map.on('draw:created', gerard);


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


function onlayerdelete(){

waypointlatlng.length = 0;

setValueForVariable("waypointcoordinates", waypointlatlng);

console.log("deleted handler fired")
console.log(waypointlatlng);

}




// add scale to map
L.control.scale({ maxWidth: 150 }).addTo(map);

}
