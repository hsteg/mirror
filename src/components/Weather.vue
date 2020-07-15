<template>
  <div id="weather">
    <div v-if="isLoading">
      <Loading/>
    </div>
    <div v-if="!isLoading" class="weather-info">
      hello, current temp is: {{ weather.current.temp }}
    </div>
  </div>
</template>

<script>
import Loading from './Loading';

export default {
  name: 'Weather',
  props: {},
  components: {
    Loading
  },
  data() {
    return {
      weather: {},
      isLoading: false
    };
  },
  methods: {},
  created: function () {
    this.isLoading = true;
      'method': 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.isLoading = false;
      this.weather = data;
    })
  }
}
</script>

<style lang="scss" scoped>
</style> 
