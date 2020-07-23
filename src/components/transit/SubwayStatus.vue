<template lang="pug">
  .subway-status.transit-section
    h1.transit-header Subway Status
    .transit-data-row(v-for="status in subwayStatuses" :key="status.color")
      .lines
        p.subway-line(
          v-for="line in status.lines"
          :key="line"
          :style="{ backgroundColor: status.color }"
        ) {{ line }}
      p.status {{ status.status }}
    p.last-updated Last updated: {{ lastUpdated }}
</template>

<script>
import client from '../../services/httpClient';

export default {
  name: 'SubwayStatus',
  data() {
    return {
      subwayStatuses: [],
      timer: '',
      lastUpdated: ''
    };
  },
  created() {
    this.getSubwayStatusData()
    // this.timer = setInterval(this.getSubwayStatusData, 60000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    getSubwayStatusData() {
      client.getSubwayStatus().then( data => {
        this.subwayStatuses = data;
        this.lastUpdated = this.moment().format("MMM D YYYY, HH:mm:ss");
      })
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
  // http://web.mta.info/developers/resources/line_colors.htm

  .subway-status {
    .transit-data-row {
      align-items: baseline;

      .lines {
        display: flex;

        .subway-line {
          margin: 5px 0;
        }
      }

      .status {
        margin: 0;
      }
    }
  }
</style>