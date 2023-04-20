import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.service.js';

export const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

export const printSuccess = (error) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + error);
};

export const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ')}
        Without params - show weather
        -s [CITY] for set city
        -h for show help
        -t [API_KEY] for set token
        `),
    );
};

export const printWeather = (res) => {
    const icon = getIcon(res.weather[0].icon);
    const iconTemp = '🌡';
    const windIcon = '💨';
    const humidityIcon = '💦';

    console.log(
        dedent(`${chalk.bgYellow(' WEATHER ')}
        Weather in ${res.name}
        ${icon} ${res.weather[0].description}
        ${iconTemp}  Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
        ${humidityIcon} Humidity: ${res.main.humidity}%
        ${windIcon} Wind speed: ${res.wind.speed}
        `),
    );
};
