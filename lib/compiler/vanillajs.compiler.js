const {exec} = require('child_process');
const path = require('path');
const tscPath = path.resolve(__dirname + '/../../node_modules/.bin/tsc');

module.exports = async (entryPath, outputPath, basename) => {
  const tmp = require('tmp');
  const tmpCompilationPath = tmp.tmpNameSync({postfix: 'ts'});

  const commandString = [
    tscPath,
    entryPath,
    '--lib es5,dom --module amd --target es5',
    '--rootDir',
    path.dirname(entryPath),
    '--outFile',
    tmpCompilationPath
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

      const fs = require('fs');
      const os = require('os');

      const compilationContents = '' + fs.readFileSync(tmpCompilationPath);
      const file = compilationContents.split(os.EOL);

      fs.unlink(tmpCompilationPath);

      // crappy ugly hack, remove amd stuff
      file.shift();
      file.shift();
      file.shift();
      file.pop();
      file.pop();

      for (let lineNumber in file) {
        let line = file[lineNumber];

        if (!line.match('//@')) {
          continue;
        }

        let includesPath = path.resolve(path.dirname(entryPath) + '/' + line.trim().replace('//@', ''));
        let includesSource = fs.readFileSync(includesPath);

        file[lineNumber] = includesSource + ';';
      }

      fs.writeFileSync(
        outputPath + '/' + basename + '.vanillajs.js',
        file.join(os.EOL)
      );

      resolve();
    });
  });
};
