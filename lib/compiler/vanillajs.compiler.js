const path = require('path');

module.exports = async (entryPath, outputPath, basename) => {
  return new Promise((resolve, reject) => {
    const ts = require('typescript');
    const fs = require('fs');
    const os = require('os');

    const source = '' + fs.readFileSync(entryPath);

    let result = ts.transpileModule(source, {compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      allowJs: true,
      lib: ['es5', 'es6', 'dom'],
      target: ts.ScriptTarget.ES5
    }});

    const file = result.outputText.split(os.EOL);

    for (let lineNumber in file) {
      let line = file[lineNumber];

      if (line.includes('Object.defineProperty(exports') || line.match(/^require\(.*\);$/i)) {
        delete file[lineNumber];

        continue;
      }

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
};
