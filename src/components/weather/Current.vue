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
      .current-row
        span.current-label Cloud Cover: 
        span.current-value {{ currentWeatherData.cloudCover }}
      .current-row
        span.current-label Humidity: 
        span.current-value {{ currentWeatherData.humidity }}
      .current-row
        span.current-label Moon Phase: 
        span.current-value {{ currentWeatherData.moonPhase }}
      .current-row
        span.current-label Precipitation: 
        span.current-value {{ currentWeatherData.precipitationAmount }}
      .current-row
        span.current-label Precipitation Type: 
        span.current-value {{ currentWeatherData.precipitationType }}
      .current-row
        span.current-label Sunrise: 
        span.current-value {{ formattedSunrise }}
      .current-row
        span.current-label Sunset: 
        span.current-value {{ formattedSunset }}
      .current-row
        span.current-label Wind Gusts: 
        span.current-value {{ currentWeatherData.windGust }}
      .current-row
        span.current-label Wind Speed: 
        span.current-value {{ currentWeatherData.windSpeed }}
      .current-row
        span.current-label Wind Direction: 
        span.current-value {{ currentWeatherData.windDirection }}
      .current-row
        span.current-label Air Quality: 
        span.current-value {{ currentWeatherData.airQuality }}
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
      return this.moment(this.currentWeatherData.sunrise).format("h:mm a");
    },
    formattedSunset: function () {
      return this.moment(this.currentWeatherData.sunset).format("h:mm a");
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
      width: 58%;

      .current-row {
        .current-value {
          float: right;
        }
      }
    }
  }
</style>