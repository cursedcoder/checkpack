#!/usr/bin/env node
require('babel-polyfill');

const path = require('path');
const logger = require('./logger');

const cli = require('yargs')
  .help('h')
  .alias('h', 'help')
  .version()
  .command(['webpack', 'browserify', 'vanillajs'], 'Compile integration', (yargs) => {
    yargs.example('[webpack|browserify|vanillajs] -e src/app.ts');
    yargs.example('[webpack|browserify|vanillajs] -e src/app.ts -o build/');

    yargs.option('entryPath', {
      describe: 'entry file path',
      alias: 'e',
      demandOption: true
    });

    yargs.option('outputPath', {
      describe: 'output directory path',
      alias: 'o'
    });

    yargs.option('validate', {
      describe: 'validate build for errors in phantomjs'
    });
  }, async (argv) => {
    const compilerName = argv._[0];
    const basename = path.basename(argv.entryPath, '.ts');
    const entryPath = path.resolve(argv.entryPath);

    const compileCommand = require('./cli/compile');

    if (!argv.outputPath) {
      const createTmp = require('./cli/create_tmp');
      const data = createTmp(compilerName, basename);
      await compileCommand(compilerName, basename, entryPath, data.directory);

      if (argv.validate) {
        const validator = require('./cli/validator');
        try {
          validator(compilerName, data.file);
        } catch (e) {
          logger.errorType(compilerName, 'validator', e);
          process.exit(1);
        }
      } else {
        const opn = require('opn');
        logger.log(compilerName, `Opening file: ${data.file}`);
        opn('file://' + data.file, {wait: false});
      }
    } else {
      await compileCommand(compilerName, basename, entryPath, path.resolve(argv.outputPath));
    }
  });

if (cli.argv._.length === 0) {
  cli.showHelp();
}
