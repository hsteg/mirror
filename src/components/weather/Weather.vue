<template lang="pug">
  #weather
    .weather-main
      current-weather
      hourly-weather
      daily-weather
</template>

<script>
import Loading from '../Loading';
import CurrentWeather from './Current';
import Hourly from './Hourly';
import Daily from './Daily';



export default {
  name: 'Weather',
  props: {},
  components: {
    'loading': Loading,
    'current-weather': CurrentWeather,
    'hourly-weather': Hourly,
    'daily-weather': Daily
  },
  data() {
    return {
      weather: {},
    };
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  #weather {
    width: 100%;

    .weather-main {
      width: 100%;
      border-radius: 15px;
      border: solid 1px #e3e3e3;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      @media (max-width: 767px) {
        display: flex;    
        flex-direction: column;
      }
    }
  }
</style> 
