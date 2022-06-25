<template lang="pug">
  #weather
    .temp-selector(@click="toggleTempDisplay") {{ formattedTempDisplay }} temp shown, click to toggle
    .weather-main
      current-weather(:displayRealFeel="displayRealFeel" :currentWeatherData="weatherData.currentWeather")
      hourly-weather(:displayRealFeel="displayRealFeel" :hourlyWeatherData="weatherData.hourlyWeather")
      daily-weather(:displayRealFeel="displayRealFeel" :dailyWeatherData="weatherData.dailyWeather")
</template>

<script>
import Loading from '../Loading';
import CurrentWeather from './Current';
import Hourly from './Hourly';
import Daily from './Daily';
import client from '../../services/httpClient';



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
      displayRealFeel: true,
      isLoading: false,
      weatherData: {}
    };
  },
  created() {
    this.getWeatherData();
  },
  computed: {
    formattedTempDisplay: function () {
      return this.displayRealFeel ? 'RealFeel' : 'Air'
    }
  },
  methods: {
    toggleTempDisplay() {
      this.displayRealFeel = !this.displayRealFeel;
    },
    getWeatherData() {
      this.isLoading = true;
      client.getWeather().then(data => {
        this.isLoading = false;
        this.weatherData = data;
        this.lastUpdated = this.moment();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #weather {
    width: 100%;

    .temp-selector {
      @media (min-width: 768px) {
        display: none;
      }

      text-decoration: underline;
      text-align: center;
      font-size: 14px;
      margin: 10px 0 20px 0;
    }

    .weather-main {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      min-height: 434px;

      @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
