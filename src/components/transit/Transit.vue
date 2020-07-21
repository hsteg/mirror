<template>
  <div id="transit">
    <div v-if="isLoading">
      <Loading/>
    </div>
    <div v-if="!isLoading" class="transit-container">
      <QueensBound v-bind:queensBoundData="transit.lines[0].departures.N"/>
    </div>
  </div>
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';
import QueensBound from './QueensBound';

export default {
  name: 'Transit',
  components: {
    Loading,
    QueensBound
  },
  data() {
    return {
      transit: {},
      isLoading: false
    };
  },
  created() {
    this.getTransitData();
  },
  methods: {
    async getTransitData() {
      this.isLoading = true;
      client.getTransit().then( data => {
        this.isLoading = false;
        this.transit = data;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  #transit {
    width: 100%;

    .transit-container {
      width: 100%;
      height: 500px;
      border-radius: 15px;
      border: solid 1px #e3e3e3;
      display: grid;
    }
  }
</style>