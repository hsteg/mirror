<template lang="pug">
  .greenpoint-ave-trains
    .header
      img(:src="'https://new.mta.info/themes/custom/bootstrap_mta/images/icons/G.svg'")
      h1 {{ headerText }}

    .train-times(v-for="departure in trainTimes" :key="departure.time")
      .train-time {{ translator[departure.destinationStationId] }} {{ timeDifference(departure.time) }}
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