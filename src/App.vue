<template>
  <div id="app">
    <Weather/>
    <Transit/>
    <!-- add major stock indices -->
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

<style lang="scss">
@import './assets/styles.scss';

body {
  background: #2e2e2e;
  height: calc(100vh - 16px);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #e3e3e3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
