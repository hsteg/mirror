<template lang="pug">
  .buses 
    .header
      h1 Bus times here
    .bus-stations
      .b62-north macca
      .b62-south  dunkin 
</template>

<script>
export default {
  name: 'Buses',

}
</script>

<style lang="scss">
  .buses {
    border-right: 1px solid white;
    border-left: 1px solid white;
  }
</style>