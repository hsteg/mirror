<template lang="pug">
  .hour-weather.weather-section
    h1.weather-header Hourly
    loading.loading(v-if="isLoading")
    hour.weather-data-row(
      v-else
      v-for="hour in hourlyWeatherData"
      :key="hour.observation_time.value"
      :realFeel="hour.feels_like.value"
      :airTemp="hour.temp.value"
      :precipitationProbability="hour.precipitation_probability.value"
      :precipitationType="hour.precipitation_type.value"
      :sunriseTime="hour.sunrise.value"
      :timestamp="hour.observation_time.value"
      :weatherCode="hour.weather_code.value"
      :displayRealFeel="displayRealFeel"
      )
    p.last-updated(v-if="!isLoading") Last updated: {{ lastUpdated }}
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';
import Hour from './Hour';

export default {
  name: 'HourlyWeather',
  components: {
    'loading': Loading,
    'hour': Hour
  },
  props: {
    displayRealFeel: Boolean
  },
  data() { 
    return {
      isLoading: false,
      lastUpdated: '',
      hourlyWeatherData: []
    }
  },
  created() {
    this.getHourlyWeatherData();
  },
  computed: {},
  methods: {
    async getHourlyWeatherData() {
      this.isLoading = true;
      client.getWeatherHourly().then( data => {
        this.isLoading = false;
        this.hourlyWeatherData = data;
        this.lastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>