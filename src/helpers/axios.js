const axios = require("axios");

export default axios.create({
  baseURL: 'https://todos-project-api.herokuapp.com',
  timeout: 10000,
});