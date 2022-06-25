<template lang="pug">
  .day
    .timestamp {{ formattedTimestamp }}
    .icon
      icon-base(:iconName="weatherCode" :iconColor="'white'")
    .temperature
      .real-feel(:class="realFeelStyle") {{ realFeelHigh }} / {{ realFeelLow }}
      .air-temp(:class="airTempStyle") {{ airTempHigh }} / {{ airTempLow }}
    .precipitation
      .precipitation-probability {{ precipitationProbability }}

</template>

<script>
import IconBase from '../icons/IconBase'

export default {
  name: 'DayWeather',
  props: {
    realFeelHigh: String,
    realFeelLow: String,
    airTempHigh: String,
    airTempLow: String,
    precipitationProbability: String,
    timestamp: String,
    sunrise: String,
    sunset: String,
    weatherCode: Number,
    displayRealFeel: Boolean
  },
  components: {
    'icon-base': IconBase
  },
  computed: {
    formattedTimestamp: function () {
      return this.moment(this.timestamp).format("ddd");
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
    .timestamp {
      width: 35px
    }

    .temperature {
      display: flex;
      align-items: center;
      width: 200px;
      justify-content: space-around;

      @media (max-width: 767px) {
        width: 110px;

        .hide {
          display: none;
        }

        .show {
          font-size: 26px;
          font-weight: 600;
          width: 110px;
        }
      }

      .real-feel {
        font-size: 26px;
        font-weight: 600;
      }
    }

    .precipitation {
      width: 41px;
      text-align: right;
    }

    .sunrise-sunset {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
</style>