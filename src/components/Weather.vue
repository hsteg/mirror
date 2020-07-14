<template>
  <div class="weather-container">
    hello, current temp is: {{ weather.current.temp }}
  </div>
</template>

<script>

export default {
  name: 'Weather',
  props: {},
  data() {
    return {
      weather: {}
    };
  },
  methods: {},
  created: function () {
      'method': 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.weather = data;
    })
  }
}
</script>

<style lang="scss" scoped>
</style> 
