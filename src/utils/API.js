import axios from 'axios';

export default axios.create({
  baseURL: 'https://ufoss-intern.herokuapp.com/api/',
});
