//Initialisation projection MN95 pour OL
proj4.defs(
    "EPSG:2056",
    "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1"
    + " +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
);
// ensuite, on doit dire à OpenLayers que notre proj4 est ok:
ol.proj.proj4.register(proj4);


//Projection de la carte
const projection = new ol.proj.Projection({
  code: "EPSG:2056",
  units: "m"
});

// =====================================================================================================
//  Affichage d'un overlay avec les coordonnées du point cliqué (n'importe ou sur la carte)
const container = document.getElementById('popup')
const content = document.getElementById('popup-content')
const closer = document.getElementById('popup-closer')

const overlay = new ol.Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        }
    },
})

closer.onclick = function() {
    overlay.setPosition(undefined)
    closer.blur()
    return false
}


// Affiche un popup quand un point du reseau est cliqué
const element = document.getElementById('popup2');
const popup2 = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
});

// Ferme le popup au mouvement de la carte
let popover;
function disposePopover() {
    if (popover) {
        popover.dispose()
        popover = undefined  
    }
}

// =====================================================================================================

// layer Tile vide
const TileLayer = new ol.layer.Tile();

//Objet contenant tous les fonds de carte de type Tile
const sources = {
    swissCNcolor: new ol.source.XYZ({
      url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
      attributions: ["&copy; <a href=\"https://www.swisstopo.admin.ch/fr/home.html\">Donnes: swisstopo</a>"]
    }),
    swissCNNB: new ol.source.XYZ({
      url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg",
      attributions: ["&copy; <a href=\"https://www.swisstopo.admin.ch/fr/home.html\">Donnes: swisstopo</a>"]
    }),
    swissImage: new ol.source.XYZ({
      url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg",
      attributions: ["&copy; <a href=\"https://www.swisstopo.admin.ch/fr/home.html\">Donnes: CNES, Spot Image, swisstopo, NPOC</a>"]
    })
};

// layer Image avec une seul source: cadastre
const ImageLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    projection: ol.proj.get("EPSG:2056"),
    url: "https://wms.geo.admin.ch/",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      TRANSPARENT: true,
      LAYERS: "ch.kantone.cadastralwebmap-farbe",
      CRS: 2056,
      LANG: "fr",
      WIDTH: 512,
      HEIGHT: 512
    },
    attributions: ["&copy; <a href=\"https://www.swisstopo.admin.ch/fr/home.html\">Donnes: swisstopo</a>"],
  })
});

const map = new ol.Map({
    target: "map",

    //vue
    view: new ol.View({
        center: [2540469, 1181217],
        projection,
        zoom: 18
    }),

    overlays: [overlay, popup2],

    // Copyright affiché tout le temps
    controls: ol.control.defaults.defaults({
      attributionOptions: {
        collapsible: false
      }
    })
})

//Ajout à la carte de la couche de base souhaitée aisi que la visibilité de base souhaitée
TileLayer.setSource(sources.swissCNcolor);
map.addLayer(TileLayer);
map.addLayer(ImageLayer);
ImageLayer.setVisible(false);



// ====================Rercherche des points dans la BDD===========
var data;

function getData() {

$.ajax({
    dataType:'json',
    url: "http://localhost:8000",
    type: 'GET',
    success: function(dataFromServer) {
        // console.log('Le serveur a répondu:', dataFromServer);
        console.log(dataFromServer);
        var pointsData = dataFromServer;
        for (var i = 0; i < pointsData.length; i++) {
            var point = pointsData[i];
            // Ajout du point à la carte
            var vectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [new ol.format.GeoJSON().readFeature(JSON.parse(point), {
                        dataProjection: 'EPSG:2056',
                        featureProjection: map.getView().getProjection()
                    })]
                })
            });
        map.addLayer(vectorLayer);
    }
}
});
}

getData()
// ===================================================================




//Contrôles
//Coordonnées de la position de la souris
const mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(3)
});
map.addControl(mousePositionControl)
//Echelle de la carte
const scaleLineControl = new ol.control.ScaleLine();
map.addControl(scaleLineControl);

// Permet d'afficher le popup des coordonnées cliquées (sur un point ou ailleurs)
map.on('singleclick', function (evt){   
    var hit1 = this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return true;
    }); 
    if (hit1 != true) {
        const coordinate = evt.coordinate
        const coordinate2display = ol.coordinate.toStringXY(coordinate, 3)
        content.innerHTML = '<p>Coordonnées (MN95):</p>' + coordinate2display
        overlay.setPosition(coordinate)
    }
    // Si click sur point -> affiche les coordonnées du points en question
    else {
        const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
        })
        disposePopover();
        if (!feature) {
            return;
        }
        PointCoordinate = feature.getGeometry().getCoordinates()
        popup2.setPosition(PointCoordinate)
        const CoordinatePoint2display = ol.coordinate.toStringXY(PointCoordinate, 3)         
        popover = new bootstrap.Popover(element, {
            placement: 'top',
            html: true,
            content: '<p>Coordonnées (MN95): </p>' + CoordinatePoint2display
        })
        popover.show();
    }
})

// Change le type de cursor quand recouvre un point
map.on("pointermove", function (evt) {
    var hit = this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return true;
    }); 
    if (hit) {
        this.getTargetElement().style.cursor = 'pointer';
    } else {
        this.getTargetElement().style.cursor = '';
    }
});

// Ferme le popup quand la carte bouge
map.on('movestart', disposePopover);

//Change la couche affichée en modifiant la visibilité (et la source si TileLayer)
function replaceSource(sourceName) {
  if (sourceName === "PlanCadastre") {
    TileLayer.setVisible(false)
    ImageLayer.setVisible(true)
  } else{
    TileLayer.setVisible(true)
    ImageLayer.setVisible(false)
    TileLayer.setSource(sources[sourceName])
  }
};


//Permet de checker seulement une checkbox et desactive automatiquement les autres (seulement pour l'id pageFdPlan)
$(document).ready(function () {
  $('#pageFdPlan input:checkbox').change(function() {
    $(this).find('#pageFdPlan input:checkbox').prop('checked', !this.checked); //toggle the state of the current checkbox
    $('#pageFdPlan input:checkbox').not(this).prop('checked', false); // uncheck  all checkboxes except the current one
  });
});

//Permet de fermer la sidebar
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

// Sources des différentes couches
const wmspiliers = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:piliers_exterieurs'},
  serverType: 'geoserver'
});

const wms_points_plani = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_exterieurs_plani'},
  serverType: 'geoserver'
});

const wms_points_alti = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_exterieurs_alti'},
  serverType: 'geoserver'
});

const wms_point_K = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_interieurs_etage_k'},
  serverType: 'geoserver'
});

const wms_point_J = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_interieurs_etage_j'},
  serverType: 'geoserver'
});

const wms_point_H = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_interieurs_etage_h'},
  serverType: 'geoserver'
});

const wms_point_G = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_interieurs_etage_g'},
  serverType: 'geoserver'
});

const wms_point_hall = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_interieurs_etages_e_f'},
  serverType: 'geoserver'
});

const wms_point_D01 = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_interieurs'},
  serverType: 'geoserver'
});

const wms_point_sphere = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:points_interieurs_sphere_scan'},
  serverType: 'geoserver'
});

const wms_plan_etage_D = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:Etage_D'},
  serverType: 'geoserver'
});	

const wms_plan_hall = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:Etages_E_F'},
  serverType: 'geoserver'
});

const wms_plan_etage_G = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:Etage_G'},
  serverType: 'geoserver'
});

const wms_plan_etage_H = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:Etage_H'},
  serverType: 'geoserver'
});

const wms_plan_etage_J = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:Etage_J'},
  serverType: 'geoserver'
});

const wms_plan_etage_K = new ol.source.ImageWMS({
  url: 'http://geoteach.heig-vd.ch:8080/geoserver/SIG4/wms',
  params: {'LAYERS': 'SIG4:Etage_K'},
  serverType: 'geoserver'
});	

// Différentes couches raster des points et des fonds de plan
let pilier = new ol.layer.Image({
    source:wmspiliers, 
    visible: false
});
let points_plani = new ol.layer.Image({
    source: wms_points_plani,
    visible: false
});
			
let points_alti = new ol.layer.Image({
  source: wms_points_alti,
  visible: false
});

let points_etage_K = new ol.layer.Image({
  source: wms_point_K,
  visible: false
});

let points_etage_J = new ol.layer.Image({
  source: wms_point_J,
  visible: false
});

let points_etage_H = new ol.layer.Image({
  source: wms_point_H,
  visible: false
});

let points_etage_G = new ol.layer.Image({
  source: wms_point_G,
  visible: false
});

let points_hall = new ol.layer.Image({
  source: wms_point_hall,
  visible: false
});

let points_D01 = new ol.layer.Image({
  source: wms_point_D01,
  visible: false
});

let points_sphere = new ol.layer.Image({
  source: wms_point_sphere,
  visible: false
});

let plan_etage_K = new ol.layer.Image({
  source: wms_plan_etage_K,
  visible: false
});

let plan_etage_J = new ol.layer.Image({
  source: wms_plan_etage_J,
  visible: false
});

let plan_etage_H = new ol.layer.Image({
  source: wms_plan_etage_H,
  visible: false
});			

let plan_etage_G = new ol.layer.Image({
  source: wms_plan_etage_G,
  visible: false
});	

let plan_hall = new ol.layer.Image({
  source: wms_plan_hall,
  visible: false
});

let plan_etage_D = new ol.layer.Image({
  source: wms_plan_etage_D,
  visible: false
});	

// Ajout des couches

map.addLayer(pilier);
map.addLayer(points_plani);
map.addLayer(points_alti);
map.addLayer(points_etage_K);
map.addLayer(points_etage_J);
map.addLayer(points_etage_H);
map.addLayer(points_etage_G);
map.addLayer(points_hall);
map.addLayer(points_D01);
map.addLayer(points_sphere);
map.addLayer(plan_etage_K);
map.addLayer(plan_etage_J);
map.addLayer(plan_etage_H);
map.addLayer(plan_etage_G);
map.addLayer(plan_hall);
map.addLayer(plan_etage_D);

//Afficher ou non les couches en superposition
function displayOverlay(button_layer_id,checked){
 if (button_layer_id == "pilier"){
  let name = pilier;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_plani"){
  let name = points_plani;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_alti"){
  let name = points_alti;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_etage_K"){
  let name = points_etage_K;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_etage_J"){
  let name = points_etage_J;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_etage_H"){
  let name = points_etage_H;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_etage_G"){
  let name = points_etage_G;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_hall"){
  let name = points_hall;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_D01"){
  let name = points_D01;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "points_sphere"){
  let name = points_sphere;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "plan_etage_K"){
  let name = plan_etage_K;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "plan_etage_H"){
  let name = plan_etage_H;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "plan_etage_G"){
  let name = plan_etage_G;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "plan_hall"){
  let name = plan_hall;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "plan_etage_D"){
  let name = plan_etage_D;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
 if (button_layer_id == "plan_etage_J"){
  let name = plan_etage_J;  
  if(checked == true){
      name.setVisible(true);
  } else {
      name.setVisible(false);
  }
 }
}


