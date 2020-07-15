<template>
  <div class="current-weather">
    <div class="temperature">
      <span class="real-feel">
        {{ formattedRealFeel }}
      </span>
      <span class="air-temp">
        {{ formattedAirTemp }}
      </span>
    </div>
    <div class="sky-conditions">
      <img v-bind:src="iconSrc">
      <p>
        {{ formattedWeatherConditions }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {
    weather: Object
  },
  computed: {
    formattedRealFeel: function () {
      return `${Math.round(this.weather.current.feels_like)}°`;
    },
    formattedAirTemp: function () {
      return `${Math.round(this.weather.current.temp)}°`;
    },
    iconSrc: function () {
      return `http://openweathermap.org/img/wn/${this.currentConditions.icon}@4x.png`
    },
    currentConditions: function () {
      return this.weather.current.weather[0];
    },
    formattedWeatherConditions: function () {
      return `${this.currentConditions.main} - ${this.currentConditions.description}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .current-weather {
    box-shadow: 1px 0 0 #404040;
    
    .temperature {
      .real-feel {
        font-size: 100px;
        font-weight: bold;
      }

      .air-temp {
        font-size: 20px;
      }
    }
  }
</style>