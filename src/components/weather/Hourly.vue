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
    last-updated(v-if="!isLoading" :lastUpdatedTime="lastUpdated" @fetchData="getHourlyWeatherData")
</template>

<script>
import Loading from '../Loading';
import Hour from './Hour';
import LastUpdated from '../LastUpdated';

export default {
  name: 'HourlyWeather',
  components: {
    'loading': Loading,
    'hour': Hour,
    'last-updated': LastUpdated
  },
  props: {
    displayRealFeel: Boolean,
    hourlyWeatherData: Array
  },
  data() {
    return {
      isLoading: false,
      lastUpdated: ''
    }
  },
  computed: {},
  methods: {
  },
}
</script>

<style lang="scss" scoped>

</style>