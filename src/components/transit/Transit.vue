<template lang="pug">
  #transit
    .loading(v-if="isLoading")
      loading
    .transit-container(v-if="!isLoading")
      greenpoint-ave-trains(
        :trainTimes="transit.slice(0,10)"
        :timeDifferenceInMin="timeDifferenceInMin"
        :headerText="'Greenpoint Avenue Station'"
        :lastUpdated="trainsLastUpdated"
      )
      buses
      subway-status
</template>

<script>
import client from '../../services/httpClient';
import Loading from '../Loading';
import GreenpointAveTrains from './GreenpointAveTrains';
import Buses from './Buses';
import SubwayStatus from './SubwayStatus';


export default {
  name: 'Transit',
  components: {
    'loading': Loading,
    'greenpoint-ave-trains': GreenpointAveTrains,
    'buses': Buses,
    'subway-status': SubwayStatus
  },
  data() {
    return {
      transit: {},
      isLoading: false,
      timer: '',
      trainsLastUpdated: ''
    };
  },
  created() {
    this.getTransitData();
    // this.timer = setInterval(this.getTransitData, 5000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  computed: {
  },
  methods: {
    async getTransitData() {
      this.isLoading = true;
      client.getTransit().then( data => {
        this.isLoading = false;
        this.setTransitData(data);
      });
    },
    setTransitData(rawData) {
      const flatData = rawData.lines[0].departures.N.
        concat(rawData.lines[0].departures.S).
          sort((a,b) => {
            return a.time - b.time;
          });
      this.transit = flatData;
      this.trainsLastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
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
  #transit {
    width: 100%;

    .transit-container {
      width: 100%;
      border-radius: 15px;
      border: solid 1px #e3e3e3;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    
      @media (max-width: 767px) {
        display: flex;    
        flex-direction: column;
      }
    }

  }
</style>