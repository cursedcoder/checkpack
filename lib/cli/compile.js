const fs = require('fs');
const logger = require('../logger');

module.exports = async (compilerName, basename, entryPath, outputPath) => {
  if (!fs.existsSync(entryPath)) {
    return logger.error(compilerName, `Entry file does not exists: ${entryPath}`);
  }

  if (!fs.existsSync(outputPath)) {
    return logger.error(compilerName, `Output directory does not exists: ${outputPath}`);
  }

  const compiler = require('../compiler/' + compilerName + '.compiler.js');

  await compiler(entryPath, outputPath, basename);

  logger.log(compilerName, `Built: ${outputPath}/${basename}.${compilerName}.js`);
};
