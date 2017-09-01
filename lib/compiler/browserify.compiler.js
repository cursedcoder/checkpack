const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

// yarn propagates symlinks
let browserifyPath = path.resolve(__dirname + '/../../node_modules/.bin/browserify');

// and npm does not
if (!fs.existsSync(browserifyPath)) {
  browserifyPath = path.resolve(__dirname + '/../../../.bin/browserify');
}

module.exports = async (entryPath, outputPath, basename) => {
  const commandString = [
    browserifyPath,
    entryPath,
    '-p [ tsify --noImplicitAny ] -o',
    outputPath + '/' + basename + '.browserify.js'
  ].join(' ');

  return new Promise((resolve, reject) => {
    exec(commandString, (err, stdout, stderr) => {
      if (err) {
        console.log(err, stdout, stderr);
        process.exit(1);
      }

      if (stderr) {
        console.log(stderr);
      }

      resolve();
    });
  });
};
