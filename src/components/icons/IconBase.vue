<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-labelledby="iconName"
  >
    <title :id="iconName" lang="en">{{iconName}}</title>
    <g :fill="iconColor">
      <component :is="formattedIconName" />
    </g>
  </svg>
</template>

<script>
import icons from './paths/index';

export default {
  name: 'IconBase',
  data() {
    return {
      translator: {
        1000: "ClearDay",
        10001: "ClearNight",
        1001: "Cloudy",
        // 10011 cloudy night?
        4000: "Drizzle",
        5001: "Flurries",
        2000: "Fog",
        2100: "FogLight",
        6000: "FreezingDrizzle",
        6001: "FreezingRain",
        6201: "FreezingRainHeavy",
        6200: "FreezingRainLight",
        7000: "IcePellets",
        7101: "IcePelletsHeavy",
        7102: "IcePelletsLight",
        1100: "MostlyClearDay",
        11001: "MostlyClearNight",
        1102: "MostlyCloudy",
        //11021 mostly cloudy night?
        1101: "PartlyCloudyDay",
        11011: "PartlyCloudyNight",
        4001: "Rain",
        4201: "RainHeavy",
        4200: "RainLight",
        5000: "Snow",
        5100: "SnowLight",
        5101: "SnowHeavy",
        8000: "TStorm",
        "refresh": "Refresh"
      }
    };
  },
  components: {
    ...icons
  },
  computed: {
    formattedIconName: function () {
      // const nightConditions = [1000, 1100, 1104]

      // if (nightConditions.includes(this.iconName)) {
      //   if (this.isBeforeSunrise) {
      //     const withTime = `${this.iconName}_night`
      //     return `${this.translator[withTime]}`;
      //   } else {
      //     return `${this.translator[this.iconName]}`;
      //   }
      // } else {
      //   return `${this.translator[this.iconName]}`;
      // }
      // rethink this logic
      return `${this.translator[this.iconName]}`;
    },
    timeNow: function () {
      return this.moment().toISOString();
    },
    isBeforeSunrise: function () {
      return !!this.sunriseTime && (this.observationTime < this.sunriseTime);
    }
  },
  props: {
    iconName: {
      type: [Number, String],
      default: 1000
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    sunriseTime: {
      type: String,
      default: null
    },
    observationTime: {
      type: String,
      default: null
    }
  }
}
</script>