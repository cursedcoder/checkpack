Checkpack [![Build Status](https://travis-ci.org/cursedcoder/checkpack.svg?branch=master)](https://travis-ci.org/cursedcoder/checkpack)
=========

Check your library integration with typescript and packagers such as webpack.

```bash
# available commands
checkpack --help

# output to browser
checkpack webpack -e src/integration.ts
checkpack browserify -e src/integration.ts
checkpack vanillajs -e src/integration.ts

# validate in chrome-headless, for CI purposes
checkpack webpack -e src/integration.ts --validate
```

VanillaJS compiler doesn't pack your dependencies automatically, so you need to include it in your build file:

```
import 'pixi.js';
import '../bin/pixi-spine.js';
import ResourceDictionary = PIXI.loaders.ResourceDictionary;
import Loader = PIXI.loaders.Loader;

//@../node_modules/pixi.js/dist/pixi.min.js
//@../bin/pixi-spine.js

// remove loader middleware which
// automatically loads spine objects
PIXI.loader['_afterMiddleware'].pop();

let app = new PIXI.Application();

document.body.appendChild(app.view);
```

Be sure to put it after any import statements.
