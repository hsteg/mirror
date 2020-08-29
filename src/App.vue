<template>
  <div id="app" v-bind:class="{ 'mirror-mode': backgroundStyle }">
    <Weather/>
    <Transit/>
    <!-- add major stock indices -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Weather from './components/weather/Weather';
import Transit from './components/transit/Transit';

export default {
  name: 'App',
  components: {
    Weather,
    Transit
  },
  created() {
    let isMirrorMode = new URLSearchParams(window.location.search).get('mirror')
    if (isMirrorMode) this.$store.commit('enableAutoUpdate');
  },
  computed: {
    ...mapGetters(['autoUpdate']),
    backgroundStyle() {
      return this.autoUpdate ? true : false;
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles.scss';

body {
  background: #2e2e2e;
  margin: 0;
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

  &.mirror-mode {
    background: black;
    color: white;
  }
}
</style>
