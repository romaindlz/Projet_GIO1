const map = new ol.Map({
    target: "map-container",
    view: new ol.View({
        center: ol.proj.transform(
            [8.2, 46.8],
            "EPSG:4326",
            "EPSG:3857"
        ),
        zoom: 8
    })
});

// Reset
ResetView.addEventListener('click', function() {
    map.getView().setCenter(ol.proj.transform([8.2, 46.8], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(8);
});

const activeLayer = new ol.layer.Tile();
const apiLayer = new ol.layer.Tile();

const sources = {
    bingRoadSource: new ol.source.BingMaps({
        imagerySet: "Road",
        key: "AlykBfO4-r5n1hccdq1LMbOy2Q2tkBGICXHfjDlMfzuaNzfUjvjcsoUQGOy5_gjR"
    }),
    bingAerialSource: new ol.source.BingMaps({
        imagerySet: "Aerial",
        key: "AlykBfO4-r5n1hccdq1LMbOy2Q2tkBGICXHfjDlMfzuaNzfUjvjcsoUQGOy5_gjR"
    }),
    apiTempSource61_90 : new ol.source.TileWMS({
        url: 'https://wms.geo.admin.ch/',
        params: {
            'SERVICE': 'WMS',
            'VERSION': '1.3.0',
            'REQUEST': 'GetMap',
            'LAYERS': 'ch.meteoschweiz.klimanormwerte-temperatur_1961_1990',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        }
    }),
    apiTempSource91_10 : new ol.source.TileWMS({
        url: 'https://wms.geo.admin.ch/',
        params: {
            'SERVICE': 'WMS',
            'VERSION': '1.3.0',
            'REQUEST': 'GetMap',
            'LAYERS': 'ch.meteoschweiz.klimanormwerte-temperatur_aktuelle_periode',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        }
    }),
    apiPrecSource61_90 : new ol.source.TileWMS({
        url: 'https://wms.geo.admin.ch/',
        params: {
            'SERVICE': 'WMS',
            'VERSION': '1.3.0',
            'REQUEST': 'GetMap',
            'LAYERS': 'ch.meteoschweiz.klimanormwerte-niederschlag_1961_1990',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        }
    }),
    apiPrecSource91_10 : new ol.source.TileWMS({
        url: 'https://wms.geo.admin.ch/',
        params: {
            'SERVICE': 'WMS',
            'VERSION': '1.3.0',
            'REQUEST': 'GetMap',
            'LAYERS': 'ch.meteoschweiz.klimanormwerte-niederschlag_aktuelle_periode',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        }
    })
};

activeLayer.setSource(sources.bingRoadSource);
map.addLayer(activeLayer);

// Function to toggle layer visibility and opacity
function OverLayer(layer, source, isVisible, opacity) {
    if (layer) {
        if (isVisible) {
            // Set layer source and add to map
            layer.setSource(source);
            map.addLayer(layer);
        } else {
            // Remove layer from map
            map.removeLayer(layer);
        }
        // Set layer opacity
        layer.setOpacity(opacity);
    }
}

function replaceSource(sourceName,layer) {
    layer.setSource(sources[sourceName]);
}


/*Temperature*/
const toggleButton_temp = document.getElementById('myonoffswitch_temp');
const sliderContainer = document.getElementById('slider');

toggleButton_temp.addEventListener('change', function() {
    const isChecked = this.checked;
    sliderContainer.style.visibility = this.checked ? 'visible' : 'hidden'; 
    if (isChecked) {
        sliderContainer.addEventListener('input', function() {
        const sliderValue = parseFloat(this.querySelector('.slider').value);
        if (sliderValue === 0) {
            OverLayer(apiLayer, sources.apiTempSource61_90, true, 0.7);
            OverLayer(apiLayer, sources.apiTempSource91_10, false, 0.7);
        } else if (sliderValue === 1) {
            OverLayer(apiLayer, sources.apiTempSource61_90, false, 0.7);
            OverLayer(apiLayer, sources.apiTempSource91_10, true, 0.7);
        }
    });
    } else {
        OverLayer(apiLayer, null, false, 0.7); // Masquer la couche
    }
});




/*Precipitation*/
const toggleButton_prec = document.getElementById('myonoffswitch_prec');

toggleButton_prec.addEventListener('change', function() {
    const isChecked = this.checked;
    sliderContainer.style.visibility = this.checked ? 'visible' : 'hidden'; 
    if (isChecked) {
        sliderContainer.addEventListener('input', function() {
        const sliderValue = parseFloat(this.querySelector('.slider').value);
        if (sliderValue === 0) {
            OverLayer(apiLayer, sources.apiPrecSource61_90, true, 0.7);
            OverLayer(apiLayer, sources.apiPrecSource91_10, false, 0.7);
        } else if (sliderValue === 1) {
            OverLayer(apiLayer, sources.apiPrecSource61_90, false, 0.7);
            OverLayer(apiLayer, sources.apiPrecSource91_10, true, 0.7);
        }
    });
    } else {
        OverLayer(apiLayer, null, false, 0.7); // Masquer la couche
    }
});


// OpenWeather API Key
var apiKey = '42a02177519d4f4bda022890afdc055a'; 

function geocodeCity() {
    // Get the city name from the input field
    const cityName = document.getElementById('search-input').value;

    // Construct the URL for the geocoding API request
    const GCapiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    // Make the AJAX request to the OpenWeatherMap Geocoding API
    $.ajax({
        url: GCapiUrl,
        method: 'GET',
        success: function (data) {
            // Handle the response data
            console.log(data);

            // Extract latitude and longitude from the response
            const latitude = data[0].lat;
            const longitude = data[0].lon;

            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            // Call a function to zoom the map to the specified coordinates
            zoomToCoordinates(latitude, longitude);
        },
        error: function (error) {
            // Handle errors
            console.error('Error fetching geocoding data:', error);
        }
    });
}

function zoomToCoordinates(latitude, longitude) {
const view = map.getView();

// Transform the coordinates to the map's projection (EPSG:3857)
const coordinates = ol.proj.fromLonLat([longitude, latitude]);

// Set the new center and zoom level
view.setCenter(coordinates);
view.setZoom(13);  // You can adjust the zoom level as needed

const resetButton = document.getElementById('resetButton');
}