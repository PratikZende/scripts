const { merge } = require('webpack-merge');
const { webpackCommonConfig } = require('./webpack.common.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TelegramWebAppInjectorPlugin } = require('./plugins/TelegramWebAppInjectorPlugin.js');
// const ZipPlugin = require('zip-webpack-plugin');
const { getCurrentDateFormatted } = require('./utils/date');
const path = require('path');
const { mergeOptions } = require('./utils/mergeOptions.js');
const { options } = require('./options.js');
const { buildDefines } = require('./utils/buildDefines.js');

/** @type {PLATFORM[]} */
const zipOutputPlatforms = [];

/**
 * Creates webpack configuration for production build
 * @param {Partial<import('./index').CLIOptions>} [customOptions] - Custom options to merge with default options
 * @param {Record<string, any>} [customDefines] - Additional defines for webpack.DefinePlugin
 * @param {import('webpack').Configuration} [webpackCustomConfig] - Custom webpack config to merge
 * @returns {import('webpack').Configuration} Final webpack production configuration
 */
function makeWebpackBuildConfig(customOptions, customDefines, webpackCustomConfig) {
  const buildOptions = mergeOptions(options, customOptions);
  customDefines = customDefines || {};
  webpackCustomConfig = webpackCustomConfig || {};

  /** @type {PLATFORM} */
  const platform = buildOptions.platform;

  let outDir = buildOptions.outDir;

  outDir = outDir.replaceAll('{name}', buildOptions.name);
  outDir = outDir.replaceAll('{version}', buildOptions.version);
  outDir = outDir.replaceAll('{language}', buildOptions.language);
  outDir = outDir.replaceAll('{platform}', platform);
  outDir = outDir.replaceAll('{date}', getCurrentDateFormatted());
  outDir = outDir.replaceAll('{hash}', '[fullhash:8]');

  // outDir = outDir.replace(/[^a-zA-Z0-9]/g, '_');

  let htmlFileName = 'index.html';

  if (!buildOptions.skipRecommendedMeta) {
    metaTags['HandheldFriendly'] = 'True';
    metaTags['cleartype'] = { 'http-equiv': 'cleartype', content: 'on' };
    metaTags['apple-mobile-web-app-capable'] = 'yes';
    metaTags['mobile-web-app-capable'] = 'yes';
    metaTags['X-UA-Compatible'] = { 'http-equiv': 'X-UA-Compatible', content: 'IE=10' };
  }

  const webpackConfig = merge(
    webpackCommonConfig,
    {
      mode: 'production',
      stats: 'errors-only',
      // performance: { hints: false },
      optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              safari10: true,
              compress: {
                drop_console: true,
                arrows: false
              },
              output: {
                comments: false,
                quote_style: 3
              }
            }
          })
        ]
      }
    },
    webpackCustomConfig
  );

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'),
      filename: htmlFileName,
      meta: metaTags,
      minify: true
    })
  );

  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      ...buildDefines(),
      ...buildOptions.defines,
      ...customDefines
    })
  );

  if (adNetwork !== 'mintegral') webpackConfig.plugins.push(new HtmlInlineScriptPlugin());

  if (platform === 'telegram') {
    webpackConfig.plugins.push(new TelegramWebAppInjectorPlugin());
  }

  if (zipOutputPlatforms.includes(platform)) {
    if (platform === 'facebook') {
      webpackConfig.plugins.push(
        new CopyWebpackPlugin({
          patterns: [{ from: path.join(__dirname, 'resources', 'fb-config.json'), to: 'fb-config.json' }]
        })
      );
    }

    // webpackConfig.plugins.push(
    //   new ZipPlugin({
    //     filename: `build.zip`,
    //     path: path.resolve(outDir)
    //   })
    // );
  }

  webpackConfig.output.path = path.resolve(outDir);

  return webpackConfig;
}

/**
 * Runs webpack production build
 * @param {import('webpack').Configuration} [webpackConfig] - Webpack configuration to use, creates default if not provided
 * @param {Partial<import('./index').CLIOptions>} [customOptions] - Custom options to merge with default options
 * @param {Record<string, any>} [customDefines] - Additional defines for webpack.DefinePlugin
 * @param {import('webpack').Configuration} [webpackCustomConfig] - Custom webpack config to merge
 */
function runBuild(webpackConfig, customOptions, customDefines, webpackCustomConfig) {
  if (!webpackConfig) webpackConfig = makeWebpackBuildConfig(customOptions, customDefines, webpackCustomConfig);

  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      console.error('Build failed:', err.stack || err);
      if (err.details) {
        console.error('Error details:', err.details);
      }
      return;
    }

    if (stats.hasErrors()) {
      console.log(stats.compilation.errors);
      console.error(`Build finished with errors.`);
    } else {
      console.log(`--------- BUILD DONE --------- `);
      console.log(webpackConfig.output?.path);
    }
  });
}

exports.makeWebpackBuildConfig = makeWebpackBuildConfig;
exports.runBuild = runBuild;
