import axios from 'axios';

export default {
  async getWeather() {
    let res = await axios.get('http://localhost:8000/weather');
    return res.data;
  },
  async getTransit() {
    let res = await axios.get('http://localhost:8000/transit');
    return res.data;
  }
}