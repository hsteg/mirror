<template lang="pug">
  .subway-status.transit-section
    h1.transit-header Subway Status
    loading(v-if="isLoading")
    .transit-data-row(v-else v-for="status in subwayStatuses" :key="status.color")
      .lines
        p.subway-line(
          v-for="line in status.lines"
          :key="line"
          :style="{ backgroundColor: status.color }"
        ) {{ line }}
      p.status {{ status.status }}
    last-updated(v-if="!isLoading" :lastUpdatedTime="lastUpdated" @fetchData="getSubwayStatusData")
</template>

<script>
import client from '../../services/httpClient';
import { autoUpdate } from '../../mixins/autoUpdate'
import Loading from '../Loading';
import LastUpdated from '../LastUpdated';

export default {
  name: 'SubwayStatus',
  components: {
    'loading': Loading,
    'last-updated': LastUpdated
  },
  mixins: [ autoUpdate ],
  data() {
    return {
      subwayStatuses: [],
      lastUpdated: '',
      isLoading: false
    };
  },
  created() {
    this.getSubwayStatusData()
    this.setAutoUpdate(this.getSubwayStatusData, 300);
  },
  methods: {
    getSubwayStatusData() {
      this.isLoading = true;
      client.getSubwayStatus().then( data => {
        this.subwayStatuses = data;
        this.isLoading = false;
        this.lastUpdated = this.moment();
      })
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