<template>
  <div class="queens-bound">
    <h1>
      To Court Square
    </h1>
    <div v-for="time in formattedDepartures" :key="time">
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QueensBound',
  props: {
    queensBoundData: Array
  },
  computed: {
    formattedDepartures: function () {
      return this.queensBoundData.map(departureObject => {
        return new Date(departureObject.time * 1000);
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>