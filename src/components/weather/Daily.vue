<template lang="pug">
.daily-weather.weather-section
  h1.weather-header Daily
  loading(v-if="isLoading")
  day.weather-data-row(
    v-else
    v-for="day in dailyWeatherData"
    :key="day.observation_time.value"
    :realFeel="day.feels_like"
    :timestamp="day.observation_time.value"
    :precipitationProbability="day.precipitation_probability.value"
    :sunrise="day.sunrise.value"
    :sunset="day.sunset.value"
    :airTemp="day.temp"
    :weatherCode="day.weather_code.value"
    :displayRealFeel="displayRealFeel"
  )
  last-updated(v-if="!isLoading" :lastUpdatedTime="lastUpdated" @fetchData="getDailyWeatherData")
  
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';
import Day from './Day';
import LastUpdated from '../LastUpdated';

export default {
  name: "DailyWeather",
  components: {
    'loading': Loading,
    'day': Day,
    'last-updated': LastUpdated
  },
  props: {
    displayRealFeel: Boolean
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