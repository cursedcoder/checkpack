const fs = require('fs');

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
    browserify.bundle().pipe(stream);
  });
};
