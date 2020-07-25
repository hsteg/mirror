<template lang="pug">
  loading(v-if="isLoading")
  .hour-weather.weather-section(v-else)
    h1.weather-header Hourly
    hour.weather-data-row(
      v-for="hour in hourlyWeatherData"
      :key="hour.observation_time.value"
      :realFeel="hour.feels_like.value"
      :airTemp="hour.temp.value"
      :precipitationProbability="hour.precipitation_probability.value"
      :precipitationType="hour.precipitation_type.value"
      :timestamp="hour.observation_time.value"
      )
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';
import Hour from './Hour';

export default {
  name: 'HourlyWeather',
  components: {
    'loading': Loading,
    'hour': Hour
  },
  data() { 
    return {
      isLoading: false,
      // hourlyWeatherData: [],
      hourlyWeatherData: [
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":73.93,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":73.93,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T03:00:00.000Z"
            }
        },
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":73.01,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":73.01,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T04:00:00.000Z"
            }
        },
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":72.29,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":72.29,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T05:00:00.000Z"
            }
        },
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":71.64,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":71.64,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T06:00:00.000Z"
            }
        },
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":71.26,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":71.26,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T07:00:00.000Z"
            }
        },
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":70.98,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":70.98,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T08:00:00.000Z"
            }
        },
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":69.97,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":69.97,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T09:00:00.000Z"
            }
        },
        {
            "lon":-73.9560627,
            "lat":40.7311045,
            "temp":{
              "value":69.33,
              "units":"F"
            },
            "precipitation_type":{
              "value":"none"
            },
            "precipitation_probability":{
              "value":0,
              "units":"%"
            },
            "feels_like":{
              "value":69.33,
              "units":"F"
            },
            "weather_code":{
              "value":"clear"
            },
            "observation_time":{
              "value":"2020-07-25T10:00:00.000Z"
            }
        }
      ]
    }
  },
  created() {
    // this.getHourlyWeatherData();
  },
  computed: {},
  methods: {
    async getHourlyWeatherData() {
      this.isLoading = true;
      client.getWeatherHourly().then( data => {
        this.isLoading = false;
        this.hourlyWeatherData = data;
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>