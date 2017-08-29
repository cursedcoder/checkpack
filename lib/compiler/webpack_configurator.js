const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = (entryName, entryPath, outputPath, externals) => {
  return {
    stats: 'none',
    entry: {
      [entryName]: [entryPath],
    },
    externals: externals,
    output: {
      path: outputPath,
      filename: '[name].webpack.js',
      sourceMapFilename: '[name].webpack.map'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      unknownContextRegExp: /$^/,
      unknownContextCritical: false,
      exprContextRegExp: /$^/,
      exprContextCritical: false,
      wrappedContextCritical: true,
      rules: [
        {
          test: /\.ts$/,
          loader: 'source-map-loader',
          enforce: 'pre'
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: './sandbox/tsconfig.sandbox.json',
            silent: true
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.md$/,
          loader: 'html!markdown'
        }
      ]
    },
    plugins: [
      /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait
       */
      new ForkCheckerPlugin(),
      /*
       * Plugin: OccurrenceOrderPlugin
       * Description: Varies the distribution of the ids to get the smallest id length
       * for often used ids.
       */
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.LoaderOptionsPlugin({
        debug: true
      })
    ],
    watchOptions: {
      ignored: '/node_modules/'
    }
  };
};
