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
        "clear_day": "ClearDay",
        "clear_night": "ClearNight",
        "cloudy": "Cloudy",
        "drizzle": "Drizzle",
        "flurries": "Flurries",
        "fog": "Fog",
        "fog_light": "FogLight",
        "freezing_drizzle": "FreezingDrizzle",
        "freezing_rain": "FreezingRain",
        "freezing_rain_heavy": "FreezingRainHeavy",
        "freezing_rain_light": "FreezingRainLight",
        "ice_pellets": "IcePellets",
        "ice_pellets_heavy": "IcePelletsHeavy",
        "ice_pellets_light": "IcePelletsLight",
        "mostly_clear_day": "MostlyClearDay",
        "mostly_clear_night": "MostlyClearNight",
        "mostly_cloudy": "MostlyCloudy",
        "partly_cloudy_day": "PartlyCloudyDay", 
        "partly_cloudy_night": "PartlyCloudyNight",
        "rain": "Rain",
        "rain_heavy": "RainHeavy",
        "rain_light": "RainLight",
        "snow": "Snow",
        "snow_light": "SnowLight",
        "snow_heavy": "SnowHeavy",
        "tstorm": "TStorm",
        "refresh": "Refresh"
      }
    };
  },
  components: {
    ...icons
  },
  computed: {
    formattedIconName: function () {
      if (this.iconName === 'clear' || this.iconName === 'mostly_clear' || this.iconName === 'partly_cloudy') {
        if (this.isBeforeSunrise) {
          const withTime = `${this.iconName}_night`
          return `${this.translator[withTime]}`;
        } else {
          const withTime = `${this.iconName}_day`
          return `${this.translator[withTime]}`;
        }
      } else {
        return `${this.translator[this.iconName]}`;
      }
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
      type: String,
      default: 'box'
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