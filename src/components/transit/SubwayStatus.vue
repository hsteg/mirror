<template lang="pug">
  .subway-status
    .header
      h1 Subway Status
    .line-status(v-for="status in subwayStatuses" :key="status.color")
      .lines
        .line(v-for="line in status.lines" :key="line" :style="{ backgroundColor: status.color }") {{ line }}
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
    padding: 20px;

    .header {
      margin-bottom: 20px;
    }
    
    h1, p {
      display: inline-block;
      margin: 0;
    }

    .line-status {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-top: 1px solid white;

      &:last-of-type {
        border-bottom: 1px solid white;
      }

      .lines {
        display: flex;

        .line {
          font-size: 20px;
          font-weight: 600;
          margin: 5px 5px 5px 0 ;
          border-radius: 30px;
          height: 30px;
          width: 30px;
          line-height: 30px;
          text-align: center;
          color: white;
        }
      }
    }

    .last-updated {
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
</style>