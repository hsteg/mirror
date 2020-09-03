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
      p {{ formattedWindDirection }}
      p {{ formattedAirQuality }}
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
    formattedHumidity: function () {
      return `Humidity: ${this.currentWeatherData.humidity.value}%`
    },
    formattedWindSpeed: function () {
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
    },
    formattedAirQuality: function () {
      return `Air Quality: ${this.currentWeatherData.epa_health_concern.value}`;
    },
    formattedWindDirection: function () {
      const directionInDegrees = this.currentWeatherData.wind_direction.value;
      const cardinalDirection = this.cardinalWindDirection(directionInDegrees);
      return `Wind Direction: ${cardinalDirection}`;
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
    },
    cardinalWindDirection(directionInDegrees) {
      let cardinalDirection;

      if (directionInDegrees > 0 && directionInDegrees <= 22.5) {
        cardinalDirection = "N";
      } else if (directionInDegrees > 22.5 && directionInDegrees <= 67.5) {
        cardinalDirection = "NE"
      } else if (directionInDegrees > 67.5  && directionInDegrees <= 112.5) {
        cardinalDirection = "E"
      } else if (directionInDegrees > 112.5 && directionInDegrees <= 157.5) {
        cardinalDirection = "SE"
      } else if (directionInDegrees > 157.5  && directionInDegrees <= 202.5) {
        cardinalDirection = "S"
      } else if (directionInDegrees > 202.5 && directionInDegrees <= 247.5) {
        cardinalDirection = "SW"
      } else if (directionInDegrees > 247.5 && directionInDegrees <= 292.5) {
        cardinalDirection = "W"
      } else if (directionInDegrees > 292.5 && directionInDegrees <= 337.5) {
        cardinalDirection = "NW"
      } else if (directionInDegrees > 337.5 && directionInDegrees <= 360) {
        cardinalDirection = "N"
      }

      return cardinalDirection;
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