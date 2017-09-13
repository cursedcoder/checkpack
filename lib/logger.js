const chalk = require('chalk');

module.exports = {
  verbose: true,
  silent: false,
  log(compiler, ...args) {
    if (this.silent) {
      return;
    }
    if (this.verbose) {
      console.log(
        this._header(compiler),
        chalk.gray(...args)
      );
    }
  },
  success(compiler, ...args) {
    if (this.silent) {
      return;
    }
    console.log(
      this._header(compiler),
      chalk.green(...args)
    );
  },
  errorType(compiler, type, ...args) {
    if (this.silent) {
      return;
    }
    console.error(
      this._header(compiler),
      chalk.underline.bold.red(`${type.toUpperCase()} ERROR:`),
      chalk.red(...args)
    );
  },
  error(compiler, ...args) {
    if (this.silent) {
      return;
    }
    console.error(
      this._header(compiler),
      chalk.red(...args)
    );
  },
  _header(compiler) {
    return chalk.white(`[${compiler}]`)
  }
};
