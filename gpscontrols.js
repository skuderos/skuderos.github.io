function gps(){

  var gpsplaneicon = L.icon({
      iconUrl: 'https://skuderos.github.io/planeicon.png',
      //shadowUrl: 'leaf-shadow.png',

      iconSize:     [50, 50], // size of the icon
      //shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
      //shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });


  var gps = new L.Control.Gps({
  		autoActive:false,
  		autoCenter:false
  	});//inizialize control

  	gps
  	.on('gps:located', function(e) {
  		e.marker.bindPopup({icon: gpsplaneicon}e.latlng.toString()).openPopup()
  		console.log(e.latlng, map.getCenter())
  	})
  	.on('gps:disabled', function(e) {
  		e.marker.closePopup()
  	});

  	gps.addTo(map);


}
