process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.REACT_APP_SSR = 'enabled';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || 'https://static.velog.io';

const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const path = require('path');
const serverlessWebpack = require('serverless-webpack');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000',
);

console.log(process.env.PUBLIC_URL);
const publicUrl = (paths.servedPath || process.env.PUBLIC_URL).slice(0, -1);
console.log({ publicUrl });
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  entry: serverlessWebpack.lib.entries,
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    path: paths.ssrServerlessBuild,
    filename: '[name].js',
    publicPath: paths.servedPath,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
              name: 'static/media/[name].[hash:8].[ext]',
              emitFile: false,
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides',
              ),

              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              onlyLocals: true,
            },
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              onlyLocals: true,
              module: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  onlyLocals: true,
                },
              },
              require.resolve('sass-loader'),
            ],
          },
          {
            test: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  onlyLocals: true,
                  module: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              require.resolve('sass-loader'),
            ],
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: paths.moduleFileExtensions
      .map(ext => `.${ext}`)
      .filter(ext => true || !ext.includes('ts')),
  },
  plugins: [
    new webpack.DefinePlugin(env.stringifiedForServerless),
    new webpack.NormalModuleReplacementPlugin(
      /codemirror/,
      path.resolve(paths.appSrc, 'lib/replacedModule.ts'),
    ),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new CopyPlugin([
      {
        from: path.resolve(paths.appBuild, 'loadable-stats.json'),
        to: 'build',
      },
    ]),
  ],
  optimization: {
    minimize: false,
  },
  externals: [
    nodeExternals({
      whitelist: [/codemirror/, /\.css$/],
    }),
  ],
  node: {
    __dirname: false,
  },
};
