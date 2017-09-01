#!/usr/bin/env node
const babel = require('babel-core');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

glob('lib/**/*.js', {}, function (er, files) {
  files.forEach(filename => {
    const contents = '' + fs.readFileSync(filename);
    const transpiled = babel.transform(contents, {
      presets: ['es2015'],
      plugins: ['syntax-async-functions', 'transform-regenerator']
    });
    const newFilename = filename.replace('lib/', 'bin/');

    mkdirp.sync(path.dirname(newFilename));
    fs.writeFileSync(newFilename, transpiled.code);
  });
});
