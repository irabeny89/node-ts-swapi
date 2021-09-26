import axios from "axios";

const swapi = axios.create({
  baseURL: "https://swapi.dev/api"
})

export default swapi