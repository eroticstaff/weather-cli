#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("No token");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved!");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("No city");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City saved!");
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather();
    printWeather(weather);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Invalid city!");
    } else if (e?.response?.status == 401) {
      printError("Invalid token!");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
    return;
  }
  if (args.s) {
    saveCity(args.s);
    return;
  }
  if (args.t) {
    saveToken(args.t);
    return;
  }
  getForcast();
};

initCLI();
