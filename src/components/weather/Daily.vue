<template lang="pug">
loading(v-if="isLoading")
.daily-weather.weather-section(v-else)
  h1.weather-header Daily
  h1 {{ this.moment().add(7, 'd').toISOString() }}
</template>

<script>
import Loading from '../Loading';

export default {
  name: "DailyWeather",
  components: {
    'loading': Loading,
    // 'day': Day
  },
  data() {
    return {
      isLoading: false,
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>