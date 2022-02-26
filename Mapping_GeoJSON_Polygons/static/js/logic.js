// We create the street view tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});    

// We create the dark view tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}); 

// Create a base layer that holds both maps
let baseMaps = {
    Light: light,
    Dark: dark
}; 

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid', {
    center: [30,30],
    zoom: 2,
    layers: [light]
});

//Pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/Robertfnicholson/Mapping_Earthquakes/main/Mapping_GeoJSON_Linestrings/torontoRoutes.json"

// Create a style for the lines. 
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
      style: myStyle,
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <h3><h3> Destination: "
          + feature.properties.dst + "</h3>");
      }
  })
  
.addTo(map);
});