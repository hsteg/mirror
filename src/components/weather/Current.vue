<template lang="pug">
  loading(v-if="isLoading")
  .current-weather.weather-section(v-else)
    .temperature
      .real-feel {{ formattedRealFeel }}
      .air-temp {{ formattedAirTemp }}
    .other-conditions
      p {{ formattedCloudCover }}
      p {{ formattedHumidity }}
      p {{ formattedMoonPhase }}
      p {{ formattedPrecipitation }}
      p {{ formattedPrecipitationType }}
      p {{ formattedSunrise }}
      p {{ formattedSunset }}
      p {{ formattedWindGust }}
      p {{ formattedWindSpeed }}
    p.last-updated Last updated: {{ lastUpdated }}

</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';

export default {
  name: 'CurrentWeather',
  components: {
    'loading': Loading,
  },
  data() {
    return {
      currentWeatherData: {},
      isLoading: false,
      lastUpdated: ''
    };
  },
  created() {
    this.getWeatherData();
  }, 
  computed: {
    formattedRealFeel: function () {
      return `${Math.round(this.currentWeatherData.feels_like.value)}°`;
    },
    formattedAirTemp: function () {
      return `Air Temp: ${Math.round(this.currentWeatherData.temp.value)}°`;
    },
    // iconSrc: function () {
    //   return `http://openweathermap.org/img/wn/${this.currentConditions.icon}@4x.png`
    // },
    formattedHumidity: function () {
      return `Humidity: ${this.currentWeatherData.humidity.value}%`
    },
    formattedWindSpeed: function () {
      // i have the wind direction too now
      // also visibility, weather_code: mostly_cloudy, 
      return `Wind Speed: ${Math.round(this.currentWeatherData.wind_speed.value)}`
    },
    formattedWindGust: function () {
      return `Wind Gusts: ${Math.round(this.currentWeatherData.wind_gust.value)}`
    },
    formattedCloudCover: function () {
      return `Cloud Cover: ${this.currentWeatherData.cloud_cover.value}%`
    },
    formattedMoonPhase: function () {
     return `Moon Phase: ${this.currentWeatherData.moon_phase.value}` ;
    },
    formattedPrecipitationType: function () {
      return `Precipitation Type: ${this.currentWeatherData.precipitation_type.value}` ;
    },
    formattedPrecipitation: function () {
      return `Precipitation: ${this.currentWeatherData.precipitation.value}` ;
    },
    formattedSunrise: function () {
      return `Sunrise: ${this.currentWeatherData.sunrise.value}` ;
    },
    formattedSunset: function () {
      return `Sunset: ${this.currentWeatherData.sunset.value}` ;
    },



  },
  methods: {
    async getWeatherData() {
      this.isLoading = true;
      client.getWeather().then( data => {
        this.isLoading = false;
        this.currentWeatherData = data;
        this.lastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .current-weather {
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

    .other-conditions {
      p {
        margin: 0;
        text-align: center;
      }
    }
  }
</style>