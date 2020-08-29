export const autoUpdate = {
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  data() {
    return {
      timer: null
    }
  },
  methods: {
    setAutoUpdate(action, timeInSeconds) {
      if (this.$store.state.autoUpdate) {
        let ms = timeInSeconds * 1000;
        this.timer = setInterval(action, ms);
      }
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  } 
}