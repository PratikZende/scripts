const { parseArgvOptions, allowedPlatforms, allowedLanguages } = require('./utils/parseArgvOptions');
const path = require('path');
const fs = require('fs');
var prettyjson = require('prettyjson');
const { name, version } = require('../package.json');
const { mergeOptions } = require('./utils/mergeOptions');

let projectName = '';
let projectVersion = '';
try {
  const projectPackageJson = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
  projectName = projectPackageJson.name || '';
  projectVersion = projectPackageJson.version || '';
} catch (err) {
  console.error('Error reading project package.json:', err.message);
}

const possibleOptions = [
  {
    name: 'name',
    hasValue: true,
    defaultValue: projectName,
    description: 'Project name (default from package.json)'
  },
  {
    name: 'version',
    hasValue: true,
    defaultValue: projectVersion,
    description: 'Project version (default from package.json)'
  },
  {
    name: 'out-dir',
    alias: 'outDir',
    defaultValue: 'build/{platform}',
    hasValue: true,
    description: 'Output directory for build files'
  },
  {
    name: 'static-dir',
    alias: 'staticDir',
    defaultValue: 'static',
    hasValue: true,
    description: 'Source directory of static build files'
  },
  {
    name: 'build-config',
    alias: 'buildConfig',
    defaultValue: 'build.json',
    hasValue: true,
    description: 'Path to build.json configuration file'
  },
  {
    name: 'ts-config',
    alias: 'tsConfig',
    defaultValue: 'tsconfig.json',
    hasValue: true,
    description: 'For TypeScript projects, path to tsconfig.json file'
  },
  {
    name: 'js-config',
    alias: 'jsConfig',
    defaultValue: 'jsconfig.json',
    hasValue: true,
    description: 'For JavaScript projects, path to jsconfig.json file'
  },
  {
    name: 'port',
    hasValue: true,
    defaultValue: 3000,
    description: 'Development server port number',
    parser: function (rawValue) {
      const value = +rawValue;
      if (isNaN(value)) throw new Error('--port should be a number');
      return value;
    }
  },
  {
    name: 'open',
    defaultValue: false,
    hasValue: false,
    description: 'Open browser automatically when server starts'
  },
  {
    name: 'platform',
    defaultValue: 'browser',
    hasValue: true,
    description: 'Target platform',
    parser: function (rawValue) {
      if (!allowedPlatforms.includes(rawValue)) {
        throw new Error(`--platform should have one of the value: ${allowedPlatforms.join(', ')}`);
      }
      return rawValue;
    }
  },
  {
    name: 'language',
    defaultValue: 'auto',
    hasValue: true,
    description: 'Target language',
    parser: function (rawValue) {
      if (!allowedLanguages.includes(rawValue)) {
        throw new Error(`--platform should have one of the value: ${allowedLanguages.join(', ')}`);
      }
      return rawValue;
    }
  },
  {
    name: 'dev',
    hasValue: true,
    description: 'Enable development mode (true/false)',
    parser: function (rawValue) {
      if (!(rawValue === 'true' || rawValue === 'false')) throw new Error('--dev should have either true or false value');
      return rawValue === 'true';
    }
  },
  {
    name: 'skip-recommended-meta',
    alias: 'skipRecommendedMeta',
    hasValue: false,
    description: "Don't inject recommended for mobile games META tags"
  },
  {
    name: 'debugger',
    hasValue: true,
    description: 'URL of debugger script to inject into code'
  }
];

/** @type {import('./index').CLIOptions} */
const options = parseArgvOptions(possibleOptions);

/**
 * Building Defines options
 */
options.defines = {};

try {
  const fileData = fs.readFileSync(path.resolve(options['buildConfig']), 'utf8');
  try {
    const customOptions = JSON.parse(fileData);
    for (let key in customOptions) {
      if (key === 'defines') Object.assign(options.defines, customOptions[key]);
      else if (possibleOptions.find((e) => e.alias === key || e.name === key)) {
        options[key] = customOptions[key];
      }
    }
  } catch (err) {
    console.log(chalk.red('Build config parsing error: ' + err.message));
  }
} catch (err) {}

let logOptions = { mode: process.env.NODE_ENV, ...options };
if (process.env.NODE_ENV === 'production') {
  delete logOptions.port;
  delete logOptions.open;
} else if (process.env.NODE_ENV === 'development') {
  delete logOptions.outDir;
}
if (logOptions.tsConfig === 'tsconfig.json') delete logOptions.tsConfig;
if (logOptions.jsConfig === 'jsconfig.json') delete logOptions.jsConfig;
if (logOptions.buildConfig === 'build.json') delete logOptions.buildConfig;
if (logOptions.language === 'auto') delete logOptions.language;
if (Object.keys(logOptions.defines).length === 0) delete logOptions.defines;

console.log(`${name} v${version}`);
console.log(prettyjson.render(logOptions, {}, 2));

exports.options = options;
