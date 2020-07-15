<template>
  <div id="weather">
    <div v-if="isLoading">
      <Loading/>
    </div>
    <div v-if="!isLoading" class="weather-container">
      <div class="current-weather">
        current weather is {{ weather.current.feels_like }}
      </div>
      <div class="future-weather">
        <div class="hourly">
          hourly weather
        </div>
        <div class="daily">
          daily weather
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './Loading';

export default {
  name: 'Weather',
  props: {},
  components: {
    Loading
  },
  data() {
    return {
      weather: {},
      isLoading: false
    };
  },
  methods: {},
  created: function () {
    this.isLoading = true;
      'method': 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.isLoading = false;
      this.weather = data;
    })
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

      .current-weather {
        box-shadow: 1px 0 0 #404040;
      }

      .future-weather {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .hourly {
          height: 50%;
          box-shadow: 0 1px 0 #404040;
        }

        .daily {
          height: 50%
        }
      }
    }
  }
</style> 
