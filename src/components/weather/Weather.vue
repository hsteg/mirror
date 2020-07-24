<template lang="pug">
  #weather
    .weather-main
      current-weather
      //- .future-weather
      //-   .hourly hourly weather
      //-   .daily
      //-     future-day(v-for="day in nextFiveDaysWeather" :key="day.dt", :dayWeather="day")
</template>

<script>
import Loading from '../Loading';
import CurrentWeather from './Current';
import Hourly from './Hourly';



export default {
  name: 'Weather',
  props: {},
  components: {
    'loading': Loading,
    'current-weather': CurrentWeather,
    'hourly-weather': Hourly
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
      height: 500px;
      border-radius: 15px;
      border: solid 1px #e3e3e3;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      @media (max-width: 767) {
        display: flex;    
        flex-direction: column;
      }
    }
  }
</style> 
