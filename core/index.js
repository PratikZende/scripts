const { allowedExtensions, webpackCommonConfig } = require('./webpack.common.js');
const { parseArgvOptions, allowedPlatforms, allowedLanguages } = require('./utils/parseArgvOptions.js');
const { mergeOptions } = require('./utils/mergeOptions.js');
const { options } = require('./options.js');
const { DebuggerInjectionPlugin } = require('./plugins/DebuggerInjectionPlugin.js');
const { runBuild, makeWebpackBuildConfig } = require('./webpack.build.js');
const { runDev, makeWebpackDevConfig } = require('./webpack.dev.js');

exports.mergeOptions = mergeOptions;
exports.parseArgvOptions = parseArgvOptions;
exports.allowedPlatforms = allowedPlatforms;
exports.allowedLanguages = allowedLanguages;

exports.options = options;

exports.allowedExtensions = allowedExtensions;
exports.webpackCommonConfig = webpackCommonConfig;
exports.makeWebpackDevConfig = makeWebpackDevConfig;
exports.makeWebpackBuildConfig = makeWebpackBuildConfig;
exports.runDev = runDev;
exports.runBuild = runBuild;

exports.DebuggerInjectionPlugin = DebuggerInjectionPlugin;
