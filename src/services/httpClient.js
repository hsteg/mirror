import axios from 'axios';

export default {
  async getWeather() {
    let res = await axios.get('https://funmirror-server.herokuapp.com/weather');
    // let res = await axios.get('http://localhost:8000/weather');

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