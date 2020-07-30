<template lang="pug">
  .last-updated
    p.updated-at Last updated: {{ lastUpdatedTime }}
    icon-base.refresh-icon(
      :iconName="'refresh'"
      :width="15"
      :height="15"
    )
</template>

<script>
import IconBase from './icons/IconBase';

export default {
  name: 'LastUpdated',
  components: {
    'icon-base': IconBase
  },
  props: {
    lastUpdatedTime: String
  }
}
</script>