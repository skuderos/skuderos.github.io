function initiategpscontrols(waypointlatlng, setmapint) {

  //declare counting variable that keeps track of which waypoint is Activate
var waypointsCompleted = 0;

// Obtain a new *world-oriented* Full Tilt JS DeviceOrientation Promise
var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });

// Wait for Promise result
promise.then(function(deviceOrientation) { // Device Orientation Events are supported

  // Register a callback to run every time a new
  // deviceorientation event is fired by the browser.
  deviceOrientation.listen(function() {

    // Get the current *screen-adjusted* device orientation angles
    var currentOrientation = deviceOrientation.getScreenAdjustedEuler();

    // Calculate the current compass heading that the user is 'looking at' (in degrees)
    var compassHeading = 360 - currentOrientation.alpha;
    var compassHeadingRounded = Math.round(compassHeading);

    // Do something with `compassHeading` here...
    const element = document.getElementById("currentheadingnumber");
    element.innerHTML = compassHeadingRounded;

    // get current location
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getCurrentGpsPosition);
  }
  else {
    console.log("Geolocation is not supported by this browser.");
  }

  function getCurrentGpsPosition(position) {
    //get current location
  var latitudecurrent = position.coords.latitude
  var longitudecurrent = position.coords.longitude;
  // get waypoint coordinates

  var allwaypointshere = window.varwaypointlatlng;

var allwaypointsheretest = [
    [
        {
            "lat": 52.25118838408467,
            "lng": 6.044597381200535
        },
        {
            "lat": 52.25413084138236,
            "lng": 6.060491138034414
        },
        {
            "lat": 52.24362116905093,
            "lng": 6.06521630898501
        },
        {
            "lat": 52.23410776938505,
            "lng": 6.064271274794867
        }
    ]
]

  console.log(allwaypointshere);
  console.log('allwaypointscombined above here');

  const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];
  var currentwaypointcoords1stsnip = nthElement(allwaypointshere, 0);
    console.log(currentwaypointcoords1stsnip);
  var currentwaypointcoords = nthElement(currentwaypointcoords1stsnip, waypointsCompleted);
  console.log(currentwaypointcoords);

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
return distanceToNextwp;
console.log(distanceToNextwp);

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
return (brng + 360) % 360;
console.log(brng);

  //place resulting heading into the element
  const element = document.getElementById("nextheadingnumber");
  element.innerHTML = brng;

//check whether distance is smaller than maximum stated distance.
//if yes, increase completed waypoints by 1
var maximumDistance = 1.5;   // in km
                  if (maximumDistance > distanceToNextwp) {
                  console.log("waypoint reached");
                  var waypointsCompletedNew = waypointsCompleted + 1;
                  var waypointsCompleted = waypointsCompletedNew;
                  }

                }

});

}).catch(function(errorMessage) { // Device Orientation Events are not supported

  console.log(errorMessage);

  // Implement some fallback controls here...

});


}