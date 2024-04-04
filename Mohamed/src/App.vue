<template>
  <div id="app">
    <MapComponent />
    <YearSlider />
  </div>
</template>

<script>
import MapComponent from './components/MapComponent.vue';
import YearSlider from './components/YearSlider.vue';

export default {
  name: 'App',
  components: {
    MapComponent,
    YearSlider
  }
};
</script>


