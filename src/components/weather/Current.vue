<template>
  <div class="current-weather">
    <div class="temperature">
      <div class="real-feel">
        {{ formattedRealFeel }}
      </div>
      <div class="air-temp">
        {{ formattedAirTemp }}
      </div>
    </div>
    <div class="sky-conditions">
      <img v-bind:src="iconSrc">
      <p>
        {{ formattedWeatherConditions }}
      </p>
    </div>
    <div class="other-conditions">
      <p>{{ formattedHumidity }}</p>
      <p>{{ formattedUvIndex }}</p>
      <p>{{ formattedWindSpeed }}</p>
      <p>{{ formattedCloudCover }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {
    currentWeather: Object
  },
  computed: {
    formattedRealFeel: function () {
      return `${Math.round(this.currentWeather.feels_like)}°`;
    },
    formattedAirTemp: function () {
      return `Air Temp: ${Math.round(this.currentWeather.temp)}°`;
    },
    iconSrc: function () {
      return `http://openweathermap.org/img/wn/${this.currentConditions.icon}@4x.png`
    },
    currentConditions: function () {
      return this.currentWeather.weather[0];
    },
    formattedWeatherConditions: function () {
      return `${this.currentConditions.main} - ${this.currentConditions.description}`
    },
    formattedHumidity: function () {
      return `Humidity: ${this.currentWeather.humidity}%`
    },
    formattedUvIndex: function () {
      return `UV Index: ${this.currentWeather.uvi}`
    },
    formattedWindSpeed: function () {
      return `Wind Speed: ${Math.round(this.currentWeather.wind_speed)}`
    },
    formattedCloudCover: function () {
      return `Cloud Cover: ${this.currentWeather.clouds}%`
    }
  }
}
</script>

<style lang="scss" scoped>
  .current-weather {
    box-shadow: 1px 0 0 #404040;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    
    .temperature {
      .real-feel {
        font-size: 100px;
        font-weight: bold;
        text-align: center;
      }

      .air-temp {
        font-size: 16px;
        text-align: center;
      }
    }

    .sky-conditions {
      p {
        margin-top: -60px;
        text-align: center;
      }
    } 

    .other-conditions {
      p {
        margin: 0;
        text-align: center;
      }
    }
  }
</style>