<template lang="pug">
  .greenpoint-ave-trains
    .header
      h1 {{ headerText }}

    .train-times
      .train-time(v-for="departure in trainTimes" :key="departure.time")
        .destination-station
          p G
          h2 {{ translator[departure.destinationStationId] }} 
        .arrival-time
          h2 {{ timeDifferenceInMin(departure.time) }}
          p min
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
    padding: 20px;
      
    h1, h2, p {
      display: inline-block;
      margin: 0;
    }
    
    .header {
      margin-bottom: 20px;
    }

    .train-times {
      h2 {
        font-size: 28px;
      }
      .train-time {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid white;
        
        &:last-of-type {
          border-bottom: 1px solid white;
        }

        .destination-station {
          display: flex;
          align-items: center;
          
          p {
          font-size: 20px;
          font-weight: 600;
          margin-right: 5px;
          border-radius: 30px;
          height: 30px;
          width: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #6CBE45;
          color: white;
          }
        }

        .arrival-time {
          display: flex;
          align-items: baseline;
        }
      }

      .last-updated {
        width: 100%;
        text-align: center;
        font-size: 14px;
      }
    }

  }
</style>