import chalk from "chalk";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const printError = (error) => {
  console.log(chalk.bgRed(`Error: ${error}`));
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
  console.log(`
  ${chalk.bgCyan(" HELP ")} 
  without arguments  -> current weather
  -s [CITY]          -> set town
  -h                 -> print help              
  -t [TOKEN]         -> set token
  ${chalk.bgCyan(" END OF HELP ")} 
  `);
};

const printWeather = (weather) => {
  console.log(`  ===================================================================
  🏙️ ${chalk.yellowBright(weather.name)}
  ------------------
  ☁️  ${chalk.magenta("Weather")} is ${weather.weather[0].description}
  🌡️ ${chalk.green("Temperature")}   ->   ${weather.main.temp}C (feels like ${
    weather.main.feels_like
  }C)
  💧  ${chalk.blue("Humidity")}      ->   ${weather.main.humidity}%
  💨  ${chalk.inverse("Wind Speed")}    ->   ${weather.wind.speed}
  ===================================================================`);
};

export { printError, printSuccess, printHelp, printWeather };
