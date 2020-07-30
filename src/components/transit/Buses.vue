<template lang="pug">
  .buses.transit-section
    h1.transit-header Bus Times
    bus-stop(
      v-for="busStop in busData"
      :key="busStop.name"
      :busStop="busStop"
    )
</template>

<script>
import client from '../../services/httpClient';
import BusStop from './BusStop';

export default {
  name: 'Buses',
  components: {
    'bus-stop': BusStop,
  },
  data() {
    return {
      busData: {
        b62south: {
          name: 'B62 towards Williamsburg',
          data: [],
          lastUpdated: '',
          timer: '',
          isLoading: false
        },
        b62north: {
          name: 'B62 towards LIC',
          data: [],
          lastUpdated: '',
          timer: '',
          isLoading: false
        }
      }
    }
  },
  created() {
    this.getB62southData();
    this.getB62northData();
    // this.busData.b62south.timer = setInterval(this.getB62southData, 5000);
    // this.busData.b62north.timer = setInterval(this.getB62northData, 5000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  computed: {
    noB62northBusData() {
      return this.busData.b62north.data.length === 0;
    },
    noB62southBusData() {
      return this.busData.b62south.data.length === 0;
    }
  },
  methods: {
    getB62southData() {
      this.busData.b62south.isLoading = true;
      client.getB62south().then( data => {
        this.busData.b62south.data = data;
        this.busData.b62south.isLoading = false;
        this.busData.b62south.lastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
      })
    },
    getB62northData() {
      this.busData.b62north.isLoading = true;
      client.getB62north().then( data => {
        this.busData.b62north.data = data;
        this.busData.b62north.isLoading = false;
        this.busData.b62north.lastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
      })
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  },

}
</script>

<style lang="scss" scoped>
</style>