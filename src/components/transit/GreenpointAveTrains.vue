<template>
  <div class="greenpoint-ave-trains">
    <div class="header">
      <img src="https://new.mta.info/themes/custom/bootstrap_mta/images/icons/G.svg">
      <h1>
        {{ headerText }}
      </h1>
    </div>

    <div class="train-times">
      <div v-for="departure in trainTimes" :key="departure.time">
        {{ translator[departure.destinationStationId] }} {{ timeDifference(departure.time) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GreenpointAveTrains',
  props: {
    headerText: String,
    timeDifference: Function,
    trainTimes: Array
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
        return this.timeDifference(departureObject.time);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    display: inline-block;
  }
</style>