<template lang="pug">
  .loading(v-if="isLoading")
      loading
  .greenpoint-ave-trains.transit-section(v-else)
    h1.transit-header Greenpoint Avenue Station
    .transit-data-row(v-for="departure in departureTimes" :key="departure.time")
      .destination-station
        p.subway-line G
        h2.station-name {{ departure.destinationStation }} 
      .arrival-time
        h2.number-min {{ timeDifferenceInMin(departure.time) }}
        p.min min
    p.last-updated Last updated: {{ lastUpdated }}
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';

export default {
  name: 'GreenpointAveTrains',
  components: {
    'loading': Loading
  },
  data() {
    return {
      departureTimes: {},
      isLoading: false,
      timer: '',
      lastUpdated: ''
    };
  },
  created() {
    this.getTransitData();
    // this.timer = setInterval(this.getTransitData, 5000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    async getTransitData() {
      this.isLoading = true;
      client.getTransit().then( data => {
        this.isLoading = false;
        this.departureTimes = data;
        this.lastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
      });
    },
    timeDifferenceInMin(departure) {
      const nowTime = new Date(Date.now()).getTime();
      const departureTime = new Date(departure * 1000).getTime();
      const difference = ( ( (departureTime - nowTime) / 1000) / 60);
      const rounded = Math.round(difference);
      return rounded;
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
  .greenpoint-ave-trains {
    .transit-data-row {
      .destination-station {
        display: flex;
        align-items: center;
        
        .subway-line {
          margin: 0 5px 0 0;
          background-color: #6CBE45;
        }
        .station-name {
          font-size: 28px;
        }
      }
      
      .arrival-time {
        .number-min {
          font-size: 28px;
        }
        .min {
          margin: 0;
        }
      }
    }
  }
</style>