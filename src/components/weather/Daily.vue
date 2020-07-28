<template lang="pug">
loading(v-if="isLoading")
.daily-weather.weather-section(v-else)
  h1.weather-header Daily
  day.weather-data-row(
    v-for="day in dailyWeatherData"
    :key="day.observation_time.value"
    :realFeel="day.feels_like"
    :timestamp="day.observation_time.value"
    :precipitationProbability="day.precipitation_probability.value"
    :sunrise="day.sunrise.value"
    :sunset="day.sunset.value"
    :airTemp="day.temp"
    :weatherCode="day.weather_code.value"
  )
  p.last-updated Last updated: {{ lastUpdated }}
  
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';
import Day from './Day';

export default {
  name: "DailyWeather",
  components: {
    'loading': Loading,
    'day': Day
  },
  data() {
    return {
      isLoading: false,
      lastUpdated: '',
      dailyWeatherData: []
    }
  },
  created() {
    this.getDailyWeatherData();
  },
  methods: {
    async getDailyWeatherData() {
      this.isLoading = true;
      client.getWeatherDaily().then( data => {
        this.isLoading = false;
        this.dailyWeatherData = data;
        this.lastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>