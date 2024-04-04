<template>
  <div id="slider-container">
    <input
      type="range"
      min="1991"
      max="2010"
      v-model="selectedYear"
      @input="emitYear"
    />
    <p>Year: {{ selectedYear }}</p>
  </div>
</template>

<script>
export default {
  name: 'YearSlider',
  data() {
    return {
      selectedYear: 1991 // Année de départ
    };
  },
  methods: {
    emitYear() {
      // Émet l'événement 'year-selected' avec l'année actuellement sélectionnée
      this.$emit('year-selected', this.selectedYear);
    }
  }
};
</script>

<style scoped>
/* Votre CSS ici */
</style>
