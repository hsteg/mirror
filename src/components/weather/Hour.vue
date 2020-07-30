<template lang="pug">
  .hour
    .timestamp {{ formattedTimestamp }}
    .icon 
      icon-base(
        :iconName="weatherCode"
        :iconColor="'white'"
        :sunriseTime="sunriseTime"
        :observationTime="timestamp"
      )
    .temperature
      .real-feel(:class="realFeelStyle") {{ formattedRealFeel }}
      .air-temp(:class="airTempStyle") {{ formattedAirTemp }}
    .precipitation
      .precipitation-probability {{ formattedPrecipitationProbability }}
      //- maybe make precip type only if precip is present
      //- .precipitation-type {{ formattedPrecipitationType }}
      //- stick code icon in here

</template>

<script>
import IconBase from '../icons/IconBase'

export default {
  name: 'HourWeather',
  props: {
    realFeel: Number,
    airTemp: Number,
    precipitationProbability: Number,
    precipitationType: String,
    timestamp: String,
    weatherCode: String,
    displayRealFeel: Boolean,
    sunriseTime: String
  },
  components: {
    'icon-base': IconBase
  },
  computed: {
    formattedRealFeel: function () {
      return `${Math.round(this.realFeel)}°`;
    },
    formattedAirTemp: function () {
      return `${Math.round(this.airTemp)}°`;
    },
    formattedPrecipitationProbability: function () {
      return `${Math.round(this.precipitationProbability)}%`
    },
    formattedPrecipitationType: function () {
      return `Precipitation Type: ${this.precipitationType}` ;
    },
    formattedTimestamp: function () {
      return this.moment(this.timestamp).format("h a");
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
  .hour {
    .timestamp {
      width: 50px;
    }
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
  }
</style>