import axios from "axios";

const swapi = axios.create({
  baseURL: "https://swapi.py4e.com/api"
})

export default swapi
