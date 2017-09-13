module.exports = async (entryPath, outputPath, basename) => {
  const configurator = require('./webpack_configurator');
  const webpack = require('webpack');
  const chalk = require('chalk');
  const logger = require('../logger');

  const config = configurator(
    basename,
    entryPath,
    outputPath
  );

  const compiler = webpack(config);

  return new Promise((resolve, reject) => compiler.run((_, stats) => {
    if (stats && stats.compilation.errors.length > 0) {
      logger.errorType('webpack', 'compile', stats.compilation.errors);

      process.exit(1);
    }

    resolve();
  }));
};
