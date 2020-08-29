<template lang="pug">
  .last-updated(@click="$emit('fetchData')")
    p.updated-at Last updated: {{ formattedLastUpdatedTime }}
    icon-base.refresh-icon(
      v-if="!autoUpdate"
      :iconName="'refresh'"
      :width="15"
      :height="15"
    )
</template>

<script>
import { mapGetters } from 'vuex';
import IconBase from './icons/IconBase';

export default {
  name: 'LastUpdated',
  components: {
    'icon-base': IconBase
  },
  props: {
    lastUpdatedTime: Object
  },
  computed: {
    ...mapGetters(['autoUpdate']),
    formattedLastUpdatedTime() {
      return this.lastUpdatedTime.format("MMM D YYYY, HH:mm:ss");
    }
  }
}
</script>