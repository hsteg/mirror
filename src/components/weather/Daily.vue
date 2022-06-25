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
  last-updated(v-if="!isLoading" :lastUpdatedTime="lastUpdated" @fetchData="getDailyWeatherData")

</template>

<script>
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
    displayRealFeel: Boolean,
    dailyWeatherData: Array
  },
  data() {
    return {
      isLoading: false,
      lastUpdated: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>