#!/usr/bin/env node
const path = require('path');

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

    const compileCommand = require('../lib/cli/compile');

    if (!argv.outputPath) {
      const createTmp = require('../lib/cli/create_tmp');
      const data = createTmp(compilerName, basename);
      await compileCommand(compilerName, basename, entryPath, data.directory);

      if (argv.validate) {
        const validator = require('../lib/cli/validator');
        validator(data.file);
      } else {
        const opn = require('opn');
        console.log('Opening tmp file: ' + data.file);
        opn(data.file, {wait: false});
      }
    } else {
      await compileCommand(compilerName, basename, entryPath, path.resolve(argv.outputPath));
    }
  });

if (cli.argv._.length === 0) {
  cli.showHelp();
}
