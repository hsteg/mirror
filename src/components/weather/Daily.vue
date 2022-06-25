<template lang="pug">
.daily-weather.weather-section
  h1.weather-header Daily
  loading(v-if="isLoading")
  day.weather-data-row(
    v-else
    v-for="day in dailyWeatherData"
    :key="day.observationTime"
    :realFeelHigh="day.realFeelHigh"
    :realFeelLow="day.realFeelLow"
    :airTempHigh="day.airTempHigh"
    :airTempLow="day.airTempLow"
    :timestamp="day.observationTime"
    :precipitationProbability="day.precipitationProbability"
    :weatherCode="day.weatherCode"
    :displayRealFeel="displayRealFeel"
  )
</template>

<script>
import Loading from '../Loading';
import Day from './Day';

export default {
  name: "DailyWeather",
  components: {
    'loading': Loading,
    'day': Day
  },
  props: {
    displayRealFeel: Boolean,
    dailyWeatherData: Array,
    isLoading: Boolean
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
