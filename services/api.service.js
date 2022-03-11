import axios from "axios";
import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
const getWeather = async () => {
  //const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const city = await getKeyValue(TOKEN_DICTIONARY.city);
  if (!city) {
    throw new Error("No city set! Use -s parameter to set it.");
  }
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error("No token set! Use -t parameter to set it.");
  }
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );
  return data;
};

export { getWeather };
