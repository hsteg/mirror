<template lang="pug">
  .greenpoint-ave-trains.transit-section
    h1.transit-header {{ headerText }}
    .transit-data-row(v-for="departure in trainTimes" :key="departure.time")
      .destination-station
        p.subway-line G
        h2.station-name {{ translator[departure.destinationStationId] }} 
      .arrival-time
        h2.number-min {{ timeDifferenceInMin(departure.time) }}
        p.min min
    p.last-updated Last updated: {{ lastUpdated }}
</template>

<script>
export default {
  name: 'GreenpointAveTrains',
  props: {
    headerText: String,
    timeDifferenceInMin: Function,
    trainTimes: Array,
    lastUpdated: String
  },
  data() {
    return {
      translator: {
        '281': 'Court Square',
        '243': 'Church Ave'
      }
    };
  },
  computed: {
    formattedDepartures: function () {
      return this.trainTimes.map(departureObject => {      
        return this.timeDifferenceInMin(departureObject.time);
      })
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