<template lang="pug">
  loading(v-if="isLoading")
  .current-weather.weather-section(v-else)
    .primary-conditions
      .icon
        icon-base(
          :iconName="currentWeatherData.weather_code.value"
          :observationTime="currentWeatherData.observation_time.value"
          :sunriseTime="currentWeatherData.sunrise.value"
          :iconColor="'white'"
          :width="150"
          :height="150"
        ) 
      .temperature
        .primary-temp {{ formattedPrimaryTemp }}
        .secondary-temp {{ formattedSecondaryTemp }}
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
    last-updated(:lastUpdatedTime="lastUpdated" @fetchData="getWeatherData")

</template>

<script>
import client from '../../services/httpClient';
import { autoUpdate } from '../../mixins/autoUpdate';
import Loading from '../Loading';
import IconBase from '../icons/IconBase';
import LastUpdated from '../LastUpdated';

export default {
  name: 'CurrentWeather',
  components: {
    'loading': Loading,
    'icon-base': IconBase,
    'last-updated': LastUpdated
  },
  mixins: [ autoUpdate ],
  props: {
    displayRealFeel: Boolean
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
    // every 2 min
    this.setAutoUpdate(this.getWeatherData, 120);
  }, 
  computed: {
    formattedRealFeel: function () {
      return `${Math.round(this.currentWeatherData.feels_like.value)}°`;
    },
    formattedAirTemp: function () {
      return `${Math.round(this.currentWeatherData.temp.value)}°`;
    },
    formattedPrimaryTemp: function () {
      return this.displayRealFeel ? this.formattedRealFeel : this.formattedAirTemp;
    },
    formattedSecondaryTemp: function () {
      return this.displayRealFeel ? `Air temp: ${this.formattedAirTemp}` : `RealFeel: ${this.formattedRealFeel}`;
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
      return `Sunrise: ${this.moment(this.currentWeatherData.sunrise.value).format("h:mm a")}` ;
    },
    formattedSunset: function () {
      return `Sunset: ${this.moment(this.currentWeatherData.sunset.value).format("h:mm a")}` ;
    }
  },
  methods: {
    async getWeatherData() {
      this.isLoading = true;
      client.getWeather().then( data => {
        this.isLoading = false;
        this.currentWeatherData = data;
        this.lastUpdated = this.moment();
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
    
    .primary-conditions {
      display: flex;
      align-items: center;

      .temperature {
        display: flex;
        flex-direction: column;
        position: relative;

        .primary-temp {
          font-size: 100px;
          position: relative;
          font-weight: bold;
          text-align: center;
        }
  
        .secondary-temp {
          font-size: 16px;
          text-align: center;
          position: absolute;
          top: 105px;
          right: 0;
        }
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