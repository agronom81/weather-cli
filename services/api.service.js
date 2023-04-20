import axios from 'axios';
import { getKeyValue, STORAGE_DICTIONARY } from './storage.service.js';

export const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '⛅️';
        case '03':
            return '☁️';
        case '04':
            return '☁';
        case '09':
            return '🌨';
        case '10':
            return '🌦';
        case '11':
            return '🌩';
        case '13':
            return '❄️';
        case '50':
            return '🌫';
        default:
            return '';
    }
};

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
            units: 'metric',
        },
    });
    return data;
};
