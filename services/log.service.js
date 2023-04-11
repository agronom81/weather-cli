import chalk from 'chalk';
import dedent from 'dedent-js';

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
