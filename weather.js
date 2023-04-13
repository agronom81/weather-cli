#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

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
        saveKeyValue('token', args.t);
    }

    // show weather
    console.log('show weather');
};

initCLI();
