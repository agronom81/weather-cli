#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';

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

const getForecast = async () => {
    try {
        const weather = await getWeather('Kyiv');
        console.log(weather);
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
        printHelp();
    }

    if (args.s) {
        // save city
        console.log('Save city');
    }

    if (args.t) {
        // save token
        return saveToken(args.t);
    }
    getForecast();
};

initCLI();
