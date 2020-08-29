<template lang="pug">
  .greenpoint-ave-trains.transit-section
    h1.transit-header Greenpoint Avenue Station
    loading(v-if="isLoading")
    .transit-data-row(v-else v-for="departure in departureTimes" :key="departure.time + departure.destinationStationId")
      .destination-station
        p.subway-line G
        h2.station-name {{ departure.destinationStation }} 
      .arrival-time
        h2.number-min {{ timeDifferenceInMin(departure.time) }}
        p.min min
    last-updated(v-if="!isLoading" :lastUpdatedTime="lastUpdated" @fetchData="getTransitData")
</template>

<script>
import client from '../../services/httpClient';
import { autoUpdate } from '../../mixins/autoUpdate';
import Loading from '../Loading';
import LastUpdated from '../LastUpdated';

export default {
  name: 'GreenpointAveTrains',
  components: {
    'loading': Loading,
    'last-updated': LastUpdated
  },
  mixins: [ autoUpdate ],
  data() {
    return {
      departureTimes: {},
      isLoading: false,
      lastUpdated: ''
    };
  },
  created() {
    this.getTransitData();
    this.setAutoUpdate(this.getTransitData, 30);
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