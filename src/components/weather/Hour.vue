<template lang="pug">
  .hour
    .timestamp {{ formattedTimestamp }}
    .temperature
      .real-feel {{ formattedRealFeel }}
      .air-temp {{ formattedAirTemp }}
    .precipitation
      .precipitation-probability {{ formattedPrecipitationProbability }}
      //- maybe make precip type only if precip is present
      //- .precipitation-type {{ formattedPrecipitationType }}
      //- stick code icon in here

</template>

<script>
export default {
  name: 'HourWeather',
  props: {
    realFeel: Number,
    airTemp: Number,
    precipitationProbability: Number,
    precipitationType: String,
    timestamp: String

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
      return this.moment(this.timestamp).format("hh:mm a");
    }
  }
}
</script>

<style lang="scss" scoped>
  .hour {
    display: flex;
    justify-content: space-between;

    .temperature {
      display: flex;
      align-items: center;
      .real-feel {
        font-size: 26px;
      }
    }
  }
</style>