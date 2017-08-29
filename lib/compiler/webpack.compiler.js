module.exports = async (entryPath, outputPath, basename) => {
  const configurator = require('./webpack_configurator');
  const webpack = require('webpack');

  const config = configurator(
    basename,
    entryPath,
    outputPath
  );

  const compiler = webpack(config);

  return new Promise((resolve, reject) => compiler.run((_, stats) => {
    if (stats && stats.compilation.errors.length > 0) {
      console.log(stats.compilation.errors);

      process.exit(1);
    }

    resolve();
  }));
};
