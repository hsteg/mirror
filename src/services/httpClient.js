import axios from 'axios';

export default {
  async getWeather() {
    // let res = await axios.get('http://192.168.1.180:8000/weatherNow');
    let res = await axios.get('https://funmirror-server.herokuapp.com/weatherNow');
    return res.data;
  },
  async getWeatherHourly() {
    // let res = await axios.get('http://192.168.1.180:8000/weatherHourly');
    let res = await axios.get('https://funmirror-server.herokuapp.com/weatherHourly');
    return res.data;
  },
  async getWeatherDaily() {
    // let res = await axios.get('http://192.168.1.180:8000/weatherDaily');
    let res = await axios.get('https://funmirror-server.herokuapp.com/weatherDaily');
    return res.data;
  },
  async getTransit() {
    // let res = await axios.get('http://192.168.1.180:8000/transit');
    let res = await axios.get('https://funmirror-server.herokuapp.com/transit');
    return res.data;
  },
  async getB62south() {
    // let res = await axios.get('http://192.168.1.180:8000/b62south');
    let res = await axios.get('https://funmirror-server.herokuapp.com/b62south');
    return res.data;
  },
  async getB62north() {
    // let res = await axios.get('http://192.168.1.180:8000/b62north');
    let res = await axios.get('https://funmirror-server.herokuapp.com/b62north');
    return res.data;
  },
  async getSubwayStatus() {
    // let res = await axios.get('http://192.168.1.180:8000/mtaStatus');
    let res = await axios.get('https://funmirror-server.herokuapp.com/mtaStatus');
    return res.data;
  }
}