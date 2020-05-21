import program from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';
import chalk from 'chalk';

/**
 * 
 */

const actionMap = {
    init: {
        alias: 'ins',
        description: 'generate a new project from a template',
        usages: [
            'my-cli init templateName projectName'
        ]
    },
    config: {
        alias: 'cfg',
        description: 'config .clisrc',
        usages: [
            "my-cli config <k> <v>",
            "my-cli get <k>",
            "my-cli set <k>",
        ]
    },
    //other commands
}

Object.keys(actionMap).forEach(action => {
    program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
        switch (action) {
            case 'init':
            case 'config':
                apply(action, ...process.argv.slice(3));
                break;
        
            default:
                break;
        }
    })
})

function help() {
    console.log('\rUsage:');
    Object.keys(actionMap).forEach(action => {
        actionMap[action].usages.forEach(usage => {
            console.log('    -     ' + usage);
        })
    })
    console.log('\r');
}

program.usage('<command> [options]');

//my-cli -h
program.on('-h', help);
program.on('--help', help);

//my-cli -V
program.version(VERSION, '-V --version').parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(make_green);
}

function make_green(txt) {
    return chalk.green(txt);
}

