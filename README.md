Checkpack
=========

Check your library integration with typescript and packagers such as webpack.

```bash
# available commands
checkpack --help

# output to browser
checkpack webpack -e src/integration.ts
checkpack browserify -e src/integration.ts
checkpack vanillajs -e src/integration.ts

# validate in phantomjs, for CI purposes
checkpack webpack -e src/integration.ts --validate
```
