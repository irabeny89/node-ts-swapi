import axios from "axios";

export const swapi = axios.create({
  baseURL: "https://swapi.dev/api"
})