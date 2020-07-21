<template lang="pug">
  #transit
    .loading(v-if="isLoading")
      loading
    .transit-container(v-if="!isLoading")
      greenpoint-ave-trains(
        :trainTimes="greenpointAveTimes"
        :timeDifference="timeDifference"
        :headerText="'Greenpoint Ave. Subway'"
      )
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';
import GreenpointAveTrains from './GreenpointAveTrains';

export default {
  name: 'Transit',
  components: {
    'loading': Loading,
    'greenpoint-ave-trains': GreenpointAveTrains
  },
  data() {
    return {
      transit: {},
      isLoading: false,
      timer: ''
    };
  },
  created() {
    this.getTransitData();
    // update the transit data every 10 seconds below
    // qb is 281,
    // curch ave bound is 243
    // this.timer = setInterval(this.getTransitData, 10000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  computed: {
    queensBoundTimes: function () {
      return this.transit.lines[0].departures.N;
    },
    brooklynBoundTimes: function () {
      return this.transit.lines[0].departures.S;
    },
    greenpointAveTimes: function () {
      return this.brooklynBoundTimes.concat(this.queensBoundTimes).sort((a, b) => {
        return a.time - b.time;
      });
    }
  },
  methods: {
    async getTransitData() {
      this.isLoading = true;
      client.getTransit().then( data => {
        this.isLoading = false;
        this.transit = data;
      });
    },
    timeDifference(departure) {
      const nowTime = new Date(Date.now()).getTime();
      const departureTime = new Date(departure * 1000).getTime();
      const difference = ( ( (departureTime - nowTime) / 1000) / 60);
      
      const rounded = Math.round(difference);

      if (rounded === 1) {
        return `${rounded} minute`
      } else {
        return `${rounded} minutes`
      }
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
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
      display: flex;
    }
  }
</style>