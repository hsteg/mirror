<template>
  <div id="app">
    <Weather msg="Welcome to Your Vue.js App"/>
    <Transit/>
  </div>
</template>

<script>
import Weather from './components/weather/Weather';
import Transit from './components/transit/Transit';

export default {
  name: 'App',
  components: {
    Weather,
    Transit
  }
}
</script>

<style>
body {
  background: #2e2e2e;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #e3e3e3;
}
</style>
