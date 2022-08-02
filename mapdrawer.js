    function setmap(){
            var map = L.map('map').setView([52.2414287, 6.05244], 14);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);

		var LeafIcon = L.Icon.extend({
			options: {
				shadowUrl: 
				    'http://leafletjs.com/docs/images/leaf-shadow.png',
				iconSize:     [38, 95],
				shadowSize:   [50, 64],
				iconAnchor:   [22, 94],
				shadowAnchor: [4, 62],
				popupAnchor:  [-3, -76]
			}
		});

		var greenIcon = new LeafIcon({
			iconUrl: 'http://leafletjs.com/docs/images/leaf-green.png'
			});

		var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);

		var drawControl = new L.Control.Draw({
			position: 'topright',
			draw: {
				polygon: {
					shapeOptions: {
						color: 'purple'
					},
					allowIntersection: false,
					drawError: {
						color: 'orange',
						timeout: 1000
					},
					showArea: true,
					metric: false,
					repeatMode: true
				},
				polyline: {
					shapeOptions: {
						color: 'red'
					},
				},
				rect: {
					shapeOptions: {
						color: 'green'
					},
				},
				circle: {
					shapeOptions: {
						color: 'steelblue'
					},
				},

			},
			edit: {
				featureGroup: drawnItems
			}
		});
		map.addControl(drawControl);
        
                function gerard (e){
                console.log('gerard called')
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				layer.bindPopup('A popup!');
			}

			drawnItems.addLayer(layer);
		}

		map.on('draw:created', gerard);
        
		
        
L.control.scale({ maxWidth: 150 }).addTo(map);

    
		}