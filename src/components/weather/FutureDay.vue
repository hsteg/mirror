<template>
  <div class="day">
    {{ formattedDayOfTheWeek }} {{ dayWeather.temp.max }} / {{ dayWeather.temp.min }}
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    dayWeather: Object
  },
  computed: {
    formattedDayOfTheWeek: function () {
      let date = new Date(this.dayWeather.dt * 1000);
      let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  
      let day = days[date.getDay()];
      console.log(date);
      return day;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>