// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
  zoom: 5,
  minZoom: 1,
});

// create a new tile layer
var tileUrl = 'https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=d33b5a212e9c4e5d8e2de8953b42c044',

layer = new L.TileLayer(tileUrl,
{
    maxZoom: 20,
}).addTo(map);


// add the layer to the map
map.addLayer(layer);

var coordinates = [
 [6.89023,52.22255],[6.7837,52.26376],[6.78359,52.26382],[6.63643,52.36418],[6.6363,52.36418],[6.58039,52.36026],[6.58022,52.36021],[6.52005,52.31211],[6.51977,52.312],[6.30127,52.25317],[6.30106,52.25313],[6.15326,52.25917],[6.15319,52.25916],[5.91545,52.18938],[5.91507,52.18933],[5.85144,52.20148],[5.85111,52.20149],[5.70563,52.19068],[5.70527,52.19065],[5.60224,52.16215],[5.60172,52.16213],[5.40695,52.17248],[5.40665,52.17247],[5.37121,52.15357], [5.37121,52.15357],[5.28233,52.20792],[5.28215,52.20799],[5.18576,52.22226],[5.18554,52.22238],[5.15171,52.28733],[5.15143,52.28747],[5.09399,52.29347],[5.09312,52.29371],[4.97816,52.34016],[4.97799,52.34017],[4.93006,52.32212],[4.92968,52.32211],[4.88461,52.33896],[4.88424,52.33902],[4.81124,52.33755],[4.81111,52.33751],[4.68906,52.28864],[4.68874,52.28848],[4.6048,52.23132],[4.6045,52.23119],[4.50163,52.20954],[4.50143,52.20944],[4.49301,52.17506]
];

// iterate through the coordinates array
for (var i = 0; i < coordinates.length; i++) {
    // swap the values of X and Y
    coordinates[i] = [coordinates[i][1], coordinates[i][0]];
}
console.log(coordinates);
map.fitBounds(coordinates,{padding: [50, 50], maxZoom: 18});

var customIcon = L.icon({
    iconUrl: '1.png',
    iconSize: [38, 95]
});


var marker5 = L.Marker.movingMarker(
    coordinates,
    10000, {autostart: true, icon: customIcon}).addTo(map);

    var polyline = L.polyline([coordinates[0]], {color: 'green', weight:8}).addTo(map);

// add a station for each coordinate in the array
for (var i = 0; i < coordinates.length; i++) {
    marker5.addStation(i, 0.2);
}

marker5.on('move', function() {
    var currentLatLng = marker5.getLatLng();
    polyline.addLatLng(currentLatLng);
});

// Create a custom icon for the starting point marker
var startMarkerIcon = L.icon({
    iconUrl: '2.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
    });
    
    // Create a custom icon for the ending point marker
    var endMarkerIcon = L.icon({
    iconUrl: '3.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
    });
    
    // Add a marker for the starting point
    var startMarker = L.marker([coordinates[0][0], coordinates[0][1]], {icon: startMarkerIcon}).addTo(map);
    startMarker.bindPopup("Starting point");
    
    // Add a marker for the ending point
    var endMarker = L.marker([coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]], {icon: endMarkerIcon}).addTo(map);
    endMarker.bindPopup("Ending point");