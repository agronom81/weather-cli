#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Wrong token value');
        return;
    }

    try {
        await saveKeyValue(STORAGE_DICTIONARY.token, token);
        printSuccess('Token saved');
    } catch (error) {
        printError(error.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError('Wrong city name');
        return;
    }

    try {
        await saveKeyValue(STORAGE_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (error) {
        printError(error.message);
    }
};

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(STORAGE_DICTIONARY.city));
        const weather = await getWeather(city);
        printWeather(weather);
    } catch (e) {
        if (e.response?.status === 404) {
            printError('Wrong city');
        } else if (e.response?.status === 401) {
            printError('Wrong token');
        } else {
            printError(e.message);
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        // save city
        return saveCity(args.s);
    }

    if (args.t) {
        // save token
        return saveToken(args.t);
    }
    return getForecast();
};

initCLI();
