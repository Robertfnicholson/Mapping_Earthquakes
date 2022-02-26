// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the satellite street view tile layer that will be an option for the map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Streets": streets,
	"Satellite": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
});

// Pass map layers into layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//let torontoHoods = "https://raw.githubusercontent.com/peterg7/Mapping_Earthquakes_GISH/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Create a style for the polygons.
//let myStyle = {
//	color: 'blue',
//	weight: 1,
//	fillColor: 'yellow',
//	fillOpacity: 0.2
//}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
	// Creating a GeoJSON layer with the retrieved data.
	L.geoJson(data).addTo(map);
});