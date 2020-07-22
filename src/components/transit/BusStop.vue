<template lang="pug">
  .bus-stop
    h2.stop-name {{ busStop.name }}
    .no-buses(v-if="noStopData") No buses en-route
    .arrival-info(v-else v-for="arrival in busStop.data" :key="arrival.expectedArrivalTime")
      .distance 
        h2.number {{ arrival.readableDistanceNumber }} 
        .units {{ arrival.readableDistanceUnits }}
      .time 
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

    h2, p {
      display: inline-block;
      margin: 0;
    }

    .arrival-info {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid white;
        
      &:last-of-type {
        border-bottom: 1px solid white;
      }

      .distance {
        display: flex;
        align-items: baseline;
      }

      .time {
        display: flex;
        align-items: baseline;

        .number-min {
          font-size: 28px;
        }
      }
    }

    .last-updated {
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
</style>