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
import client from '../../services/httpClient';
import { autoUpdate } from '../../mixins/autoUpdate';
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
  mixins: [ autoUpdate ],
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
    // every hour
    this.setAutoUpdate(this.getDailyWeatherData, 3600);
  },
  methods: {
    async getDailyWeatherData() {
      this.isLoading = true;
      client.getWeatherDaily().then( data => {
        this.isLoading = false;
        this.dailyWeatherData = data;
        this.lastUpdated = this.moment();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>