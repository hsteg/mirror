<template lang="pug">
  .hour-weather.weather-section
    h1.weather-header Hourly
    loading.loading(v-if="isLoading")
    hour.weather-data-row(
      v-else
      v-for="hour in hourlyWeatherData"
      :key="hour.observationTime"
      :realFeel="hour.realFeel"
      :airTemp="hour.airTemp"
      :precipitationProbability="hour.precipitationProbability"
      :precipitationType="hour.precipitationType"
      :sunriseTime="hour.sunrise"
      :timestamp="hour.observationTime"
      :weatherCode="hour.weatherCode"
      :displayRealFeel="displayRealFeel"
      )
</template>

<script>
import Loading from '../Loading';
import Hour from './Hour';

export default {
  name: 'HourlyWeather',
  components: {
    'loading': Loading,
    'hour': Hour
  },
  props: {
    displayRealFeel: Boolean,
    hourlyWeatherData: Array,
    isLoading: Boolean
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
