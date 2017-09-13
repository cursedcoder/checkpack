const fs = require('fs');
const logger = require('../logger');

module.exports = async (entryPath, outputPath, basename) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(outputPath + '/' + basename + '.browserify.js');
    const browserify = require('browserify')();

    stream.on('close', () => {
      resolve();
    });

    browserify.add(entryPath);
    browserify.plugin('tsify', [
      'noImplicitAny'
    ]);
    const bundle = browserify.bundle();
    bundle.on('error', (e) => {
      logger.errorType('browserify', 'compile', e.message);
      process.exit(1);
    });
    bundle.pipe(stream);
  });
};
