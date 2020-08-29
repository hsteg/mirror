<template lang="pug">
  .buses.transit-section
    h1.transit-header Bus Times
    bus-stop(
      v-for="busStop in busData"
      :key="busStop.name"
      :busStop="busStop"
      @fetchB62SData="getB62southData"
      @fetchB62NData="getB62northData"
    )
</template>

<script>
import client from '../../services/httpClient';
import { autoUpdate } from '../../mixins/autoUpdate';
import BusStop from './BusStop';

export default {
  name: 'Buses',
  components: {
    'bus-stop': BusStop,
  },
  mixins: [ autoUpdate ],
  data() {
    return {
      busData: {
        b62south: {
          name: 'B62 towards Williamsburg',
          data: [],
          lastUpdated: '',
          isLoading: false
        },
        b62north: {
          name: 'B62 towards LIC',
          data: [],
          lastUpdated: '',
          isLoading: false
        }
      }
    }
  },
  created() {
    this.getB62southData();
    this.getB62northData();
    this.setAutoUpdate(this.getB62southData, 30);
    this.setAutoUpdate(this.getB62northData, 30);
  },
  methods: {
    getB62southData() {
      this.busData.b62south.isLoading = true;
      client.getB62south().then( data => {
        this.busData.b62south.data = data;
        this.busData.b62south.isLoading = false;
        this.busData.b62south.lastUpdated = this.moment();
      })
    },
    getB62northData() {
      this.busData.b62north.isLoading = true;
      client.getB62north().then( data => {
        this.busData.b62north.data = data;
        this.busData.b62north.isLoading = false;
        this.busData.b62north.lastUpdated = this.moment();
      })
    }
  },

}
</script>

<style lang="scss" scoped>
</style>