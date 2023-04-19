import axios from 'axios';
import { getKeyValue, STORAGE_DICTIONARY } from './storage.service.js';
import { printError } from './log.service.js';

export const getWeather = async (city) => {
    const token = process.env.TOKEN || (await getKeyValue(STORAGE_DICTIONARY.token));

    if (!token) {
        throw new Error('No api key, set it with command -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'uk',
            units: 'metrics',
        },
    });
    return data;
};
