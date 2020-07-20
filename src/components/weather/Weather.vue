<template>
  <div id="weather">
    <div v-if="isLoading">
      <Loading/>
    </div>
    <div v-if="!isLoading" class="weather-container">
      <CurrentWeather v-bind:currentWeather="weather.current"/>
      <div class="future-weather">
        <div class="hourly">
          hourly weather
        </div>
        <div class="daily">
          <FutureDay v-for="day in nextFiveDaysWeather" :key="day.dt" v-bind:dayWeather="day" />
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading';
import CurrentWeather from './Current';
import FutureDay from './FutureDay';

import client from '../../services/httpClient';

export default {
  name: 'Weather',
  props: {},
  components: {
    Loading,
    CurrentWeather,
    FutureDay
  },
  data() {
    return {
      weather: {},
      isLoading: false
    };
  },
  computed: {
    nextFiveDaysWeather: function () {
      return this.weather.daily.slice(1,6);
    }
  },
  methods: {
    async getWeatherData() {
      this.isLoading = true;
      client.getWeather().then( data => {
        this.isLoading = false;
        this.weather = data;
      })
    }
  },
  created() {
    this.getWeatherData();
  }
}
</script>

<style lang="scss" scoped>
  #weather {
    width: 100%;

    .weather-container {
      width: 100%;
      height: 500px;
      border-radius: 15px;
      border: solid 1px #e3e3e3;
      display: grid;
      grid-template-columns: 1fr 2fr;

      .future-weather {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .hourly {
          height: 50%;
          box-shadow: 0 1px 0 #404040;
        }

        .daily {
          height: 50%;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }
      }
    }
  }
</style> 
