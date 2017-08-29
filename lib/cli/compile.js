const fs = require('fs');

module.exports = async (compilerName, basename, entryPath, outputPath) => {
  if (!fs.existsSync(entryPath)) {
    return console.error('Entry file does not exists: ' + entryPath);
  }

  if (!fs.existsSync(outputPath)) {
    return console.error('Output directory does not exists: ' + outputPath);
  }

  const compiler = require('../compiler/' + compilerName + '.compiler.js');

  await compiler(entryPath, outputPath, basename);

  const filename = basename + '.' + compilerName + '.js';
  console.log(compilerName + ' built: ' + outputPath + '/' + filename);
};
