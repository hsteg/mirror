import axios from 'axios';

export default {
  async getWeather() {
    // http://192.168.1.180:8000
    let res = await axios.get('https://protected-mesa-58440.herokuapp.com/weatherNow');
    return res.data;
  },
  async getWeatherHourly() {
    let res = await axios.get('https://protected-mesa-58440.herokuapp.com/weatherHourly');
    return res.data;
  },
  async getWeatherDaily() {
    let res = await axios.get('https://protected-mesa-58440.herokuapp.com/weatherDaily');
    return res.data;
  },
  async getTransit() {
    let res = await axios.get('https://protected-mesa-58440.herokuapp.com/transit');
    return res.data;
  },
  async getB62south() {
    let res = await axios.get('https://protected-mesa-58440.herokuapp.com/b62south');
    return res.data;
  },
  async getB62north() {
    let res = await axios.get('https://protected-mesa-58440.herokuapp.com/b62north');
    return res.data;
  },
  async getSubwayStatus() {
    let res = await axios.get('https://protected-mesa-58440.herokuapp.com/mtaStatus');
    return res.data;
  }
}