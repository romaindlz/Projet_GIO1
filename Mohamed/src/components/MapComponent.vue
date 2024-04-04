<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapComponent',
  props: {
    selectedYear: Number
  },
  data() {
    return {
      map: null,
      markersLayer: null
    };
  },
  mounted() {
    this.initMap();
    this.loadAndDisplayJSON();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([46.8182, 8.2275], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.markersLayer = L.layerGroup().addTo(this.map);
    },
    loadAndDisplayJSON() {
      fetch(`public\data\GlobalTempData.json`)
        .then(response => response.json())
        .then(data => {
          this.markersLayer.clearLayers(); // Clear previous markers
          const yearData = data.filter(d => new Date(d.dt).getFullYear() === this.selectedYear);
          yearData.forEach(item => {
            const coords = [parseFloat(item.Latitude), parseFloat(item.Longitude)]; // Assurez-vous que les données sont correctement formatées
            L.marker(coords).addTo(this.markersLayer)
              .bindPopup(`<b>${item.City}</b><br>Température moyenne: ${item.AverageTemperature}°C`);
          });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
    }
  },
  watch: {
    selectedYear(newYear, oldYear) {
      if (newYear !== oldYear) {
        this.loadAndDisplayJSON();
      }
    }
  }
};
</script>

<style>
/* Leaflet's CSS */
</style>
