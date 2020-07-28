<template lang="pug">
  #transit
    .transit-main
      greenpoint-ave-trains
      buses
      subway-status
</template>

<script>
import GreenpointAveTrains from './GreenpointAveTrains';
import Buses from './Buses';
import SubwayStatus from './SubwayStatus';


export default {
  name: 'Transit',
  components: {
    'greenpoint-ave-trains': GreenpointAveTrains,
    'buses': Buses,
    'subway-status': SubwayStatus
  },
}
</script>

<style lang="scss" scoped>
  #transit {
    width: 100%;

    .transit-main {
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