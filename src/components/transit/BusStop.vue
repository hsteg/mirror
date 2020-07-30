<template lang="pug">
  .bus-stop
    h2.stop-name {{ busStop.name }}
    p.no-buses(v-if="noStopData && !busStop.isLoading") No buses en-route
    loading(v-if="busStop.isLoading")
    .transit-data-row(v-else v-for="arrival in busStop.data" :key="arrival.expectedArrivalTime")
      .distance 
        h2.number {{ arrival.readableDistanceNumber }} 
        p.units {{ arrival.readableDistanceUnits }}
      .arrival-time 
        h2.number-min {{ -1 * (moment().diff(arrival.expectedArrivalTime, 'minutes')) }} 
        p.min min
    p.last-updated(v-if="!busStop.isLoading") Last updated: {{ busStop.lastUpdated }}
</template>

<script>
import Loading from '../Loading'

export default {
  name: 'BusStop',
  components: {
    'loading': Loading
  },
  props: {
    busStop: Object
  },
  computed: {
    noStopData() {
      return this.busStop.data.length === 0;
    }
  }
}
</script>

<style lang="scss" scoped>
  .bus-stop {
    margin-bottom: 20px;

    .stop-name {
      margin-bottom: 5px;
      margin-top: 0;
      display: block;
    }

    .transit-data-row {
      .distance {
        display: flex;
        align-items: baseline;

        .units {
          margin: 0;
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