<template lang="pug">
  .day
    .timestamp {{ formattedTimestamp }}
    .icon
      icon-base(:iconName="weatherCode" :iconColor="'white'")
    .temperature
      .real-feel(:class="realFeelStyle") {{ formattedRealFeelHi }} / {{ formattedRealFeelLow }}
      .air-temp(:class="airTempStyle") {{ formattedAirTempHi }} / {{ formattedAirTempLow }}
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
    weatherCode: String,
    displayRealFeel: Boolean
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
    },
    realFeelStyle: function () {
      return this.displayRealFeel ? 'show' : 'hide';
    },
    airTempStyle: function () {
      return this.displayRealFeel ? 'hide' : 'show';
    }
  }
}
</script>

<style lang="scss" scoped>
  .day {
    .temperature {
      display: flex;
      align-items: center;

      @media (max-width: 767px) {
        .hide {
          display: none;
        }

        .show {
          font-size: 26px;
          font-weight: 600;
        }
      }
      
      .real-feel {
        font-size: 26px;  
        font-weight: 600;
      }
    }

    .sunrise-sunset {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
</style>