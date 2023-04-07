#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
	const args = getArgs(process.argv);
	console.log(args);
	if (args.h) {
		// show help
		console.log("Some help info");
	}

	if (args.s) {
		// save city
		console.log("Save city");
	}

	if (args.t) {
		// save token
		console.log("Save token");
	}

	// show weather
	console.log("show weather");
};

initCLI();
