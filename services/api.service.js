import https from 'https';
import { getKeyValue, STORAGE_DICTIONARY } from './storage.service';
import { printError } from './log.service';

export const getWeather = async (city) => {
    const token = await getKeyValue(STORAGE_DICTIONARY.token);

    if (!token) {
        printError('No api key, set it with command -t [API_KEY]');
        return;
    }

    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('lang', 'ua');
    url.searchParams.append('units', 'metric');

    https.get(url, (response) => {
        let res = '';

        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {
            console.log(res);
        });

        response.on('error', (error) => {
            console.log(error.message);
        });
    });
};
