<template lang="pug">
  .day
    .timestamp {{ formattedTimestamp }}
    .icon
      icon-base(:iconName="weatherCode" :iconColor="'white'")
    .temperature
      .real-feel {{ formattedRealFeelHi }} / {{ formattedRealFeelLow }}
      .air-temp {{ formattedAirTempHi }} / {{ formattedAirTempLow }}
    .precipitation
      .precipitation-probability {{ formattedPrecipitationProbability }}
    .sunrise-sunset
      .sunrise {{ formattedSunrise }}
      .sunset {{ formattedSunset }}

</template>

<script>
import IconBase from '../icons/IconBase'

export default {
  name: 'DayWeather',
  props: {
    realFeel: Array,
    airTemp: Array,
    precipitationProbability: Number,
    timestamp: String,
    sunrise: String,
    sunset: String,
    weatherCode: String
  },
  components: {
    'icon-base': IconBase
  },
  computed: {
    formattedRealFeelHi: function () {
      return `${Math.round(this.realFeel[1].max.value)}°`;
    },
    formattedRealFeelLow: function () {
      return `${Math.round(this.realFeel[0].min.value)}°`;
    },
    formattedAirTempHi: function () {
      return `${Math.round(this.airTemp[1].max.value)}°`;
    },
    formattedAirTempLow: function () {
      return `${Math.round(this.airTemp[0].min.value)}°`;
    },
    formattedPrecipitationProbability: function () {
      return `${Math.round(this.precipitationProbability)}%`
    },
    formattedTimestamp: function () {
      return this.moment(this.timestamp).format("ddd");
    },
    formattedSunrise: function () {
      return this.moment(this.sunrise).format("h:mm a");
    },
    formattedSunset: function () {
      return this.moment(this.sunset).format("h:mm a");
    }
  }
}
</script>

<style lang="scss" scoped>
  .day {
    .temperature {
      display: flex;
      align-items: center;
      .real-feel {
        font-size: 26px;  
        font-weight: 600;
      }
    }
  }
</style>