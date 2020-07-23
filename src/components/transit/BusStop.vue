<template lang="pug">
  .bus-stop
    h2.stop-name {{ busStop.name }}
    p.no-buses(v-if="noStopData") No buses en-route
    .transit-data-row(v-else v-for="arrival in busStop.data" :key="arrival.expectedArrivalTime")
      .distance 
        h2.number {{ arrival.readableDistanceNumber }} 
        p.units {{ arrival.readableDistanceUnits }}
      .arrival-time 
        h2.number-min {{ -1 * (moment().diff(arrival.expectedArrivalTime, 'minutes')) }} 
        p.min min
    p.last-updated Last updated: {{ busStop.lastUpdated }}
</template>

<script>
export default {
  name: 'BusStop',
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