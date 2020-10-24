<template lang="pug">
  loading(v-if="isLoading")
  .current-weather.weather-section(v-else)
    .primary-conditions
      .icon
        icon-base(
          :iconName="currentWeatherData.weatherCode"
          :observationTime="currentWeatherData.observationTime"
          :sunriseTime="currentWeatherData.sunrise"
          :iconColor="'white'"
          :width="150"
          :height="150"
        ) 
      .temperature
        .primary-temp {{ formattedPrimaryTemp }}
        .secondary-temp {{ formattedSecondaryTemp }}
    .other-conditions
      p Cloud Cover: {{ currentWeatherData.cloudCover }}
      p Humidity: {{ currentWeatherData.humidity }}
      p MoonPhase: {{ currentWeatherData.moonPhase }}
      p Precipitation: {{ currentWeatherData.precipitationAmount }}
      p Precipitation Type: {{ currentWeatherData.precipitationType }}
      p {{ formattedSunrise }}
      p {{ formattedSunset }}
      p Wind Gusts: {{ currentWeatherData.windGust }}
      p Wind Speed: {{ currentWeatherData.windSpeed }}
      p Wind Direction: {{ currentWeatherData.windDirection }}
      p Air Quality: {{ currentWeatherData.airQuality }}
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
    formattedPrimaryTemp: function () {
      return this.displayRealFeel ? this.currentWeatherData.realFeel : this.currentWeatherData.airTemp;
    },
    formattedSecondaryTemp: function () {
      return this.displayRealFeel ? `Air temp: ${this.currentWeatherData.airTemp}` : `RealFeel: ${this.currentWeatherData.realFeel}`;
    },
    formattedSunrise: function () {
      return `Sunrise: ${this.moment(this.currentWeatherData.sunrise).format("h:mm a")}` ;
    },
    formattedSunset: function () {
      return `Sunset: ${this.moment(this.currentWeatherData.sunset).format("h:mm a")}` ;
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
    margin-top: -15px;
    
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