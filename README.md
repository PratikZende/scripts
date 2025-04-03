# @smoud/scripts

[![npm version](https://img.shields.io/npm/v/@smoud/scripts)](https://www.npmjs.com/package/@smoud/scripts)
[![Downloads](https://img.shields.io/npm/dw/@smoud/scripts)](https://www.npmjs.com/package/@smoud/scripts)
[![DeepScan grade](https://deepscan.io/api/teams/19616/projects/29227/branches/939281/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=19616&pid=29227&bid=939281)
[![License](https://img.shields.io/npm/l/@smoud/scripts)](https://github.com/smoudjs/scripts/blob/master/LICENSE)

**The Ultimate Build Tool for HTML5 Games**

`@smoud/scripts` is a powerful build tool for HTML5 games, designed to streamline development, optimization, and packaging for multiple platforms, including web browsers, game portals, social media, mobile, and web3 platforms. This tool provides a one-command solution to handle platform-specific requirements, asset optimization, and build automation.

## Features

- 🚀 **One-Command Build Process** – Easily generate builds for different platforms.
- ⚡ **Automatic Optimizations** – Includes minification, tree-shaking, and dead code elimination.
- 🎯 **Pre-configured for Major Platforms** – Works out of the box with **web browsers, game portals, social media platforms, mobile platforms, and Web3/blockchain platforms**.
- 🛠️ **Customizable** – Extend the default build pipeline as needed.

## Installation

```bash
npm install --save-dev @smoud/scripts
```

## Quick Start

1. Install the package
2. Create a basic project structure:

```
your-game/
  ├── src/
  │   ├── index.html
  │   └── index.ts
  ├── package.json
  └── build.json (optional)
```

3. Add scripts to your package.json:

```json
{
  "scripts": {
    "dev": "smoud-scripts dev",
    "build": "smoud-scripts build"
  }
}
```

4. Start development:

```bash
npm run dev
```

5. Build for a specific platform:

```bash
npm run build browser
```

## CLI Arguments

| Option                    | Description                              | Default            | Example                                |
| ------------------------- | ---------------------------------------- | ------------------ | -------------------------------------- |
| **Platform**              | Target platform                          | `browser`          | `poki`                                 |
| `--name`                  | Project name                             | from package.json  | `--name MyGame`                        |
| `--version`               | Project version                          | from package.json  | `--version 1.0.0`                      |
| `--out-dir`               | Output directory for build files         | `build/{platform}` | `--out-dir build/{version}/{platform}` |
| `--static-dir`            | Source directory of static build files   | `static`           | `--static-dir public`                  |
| `--build-config`          | Path to build.json configuration file    | `build.json`       | `--build-config custom.json`           |
| `--ts-config`             | Path to tsconfig.json configuration file | `tsconfig.json`    | `--ts-config tsconfig.prod.json`       |
| `--js-config`             | Path to jsconfig.json configuration file | `jsconfig.json`    | `--js-config jsconfig.prod.json`       |
| `--port`                  | Development server port number           | `3000`             | `--port 8080`                          |
| `--open`                  | Open browser automatically               | `false`            | `--open`                               |
| `--dev`                   | Enable development mode                  | `true`             | `--dev false`                          |
| `--skip-recommended-meta` | Skip recommended meta tags injection     | `false`            | `--skip-recommended-meta`              |
| `--debugger`              | URL of debugger script to inject         | -                  | `--debugger https://...`               |

#### Target Platform

Specify the target platform directly as a command argument:

```bash
smoud-scripts build poki
```

#### Supported Platforms

- **Web Browsers**

  - `browser` - Standard web browser

- **Web-Based Game Portals**

  - `crazygames` - CrazyGames
  - `poki` - Poki
  - `kongregate` - Kongregate
  - `newgrounds` - Newgrounds
  - `y8` - Y8
  - `gamedistribution` - GameDistribution
  - `miniclip` - Miniclip

- **Indie-Focused & Pay-What-You-Want Platforms**

  - `itch` - itch.io
  - `gamejolt` - Game Jolt
  - `simmer` - Simmer.io

- **Mobile Platforms (via WebView or PWA)**

  - `googleplay` - Google Play
  - `appstore` - App Store
  - `galaxystore` - Galaxy Store
  - `amazonappstore` - Amazon Appstore

- **Social Media & Messenger Games**

  - `facebook` - Facebook
  - `snapchat` - Snapchat
  - `wechat` - WeChat
  - `tiktok` - TikTok
  - `telegram` - Telegram

- **Web3 & Blockchain-Based Platforms**
  - `sandbox` - The Sandbox
  - `opgames` - OP Games
  - `immutablex` - Immutable X

#### Supported Languages

- `auto`, `en`, `es`, `zh`, `hi`, `ar`, `fr`, `de`, `ja`, `pt`, `it`, `ko`, `tr`, `nl`, `sv`, `pl`, `uk`, `id`, `vi`

## Build Configuration (build.json)

The `build.json` file allows you to customize build options. Here's the format:

```json
{
  "outDir": "dist/{platform}",
  "name": "MyGame",
  "version": "1.2.0",
  "language": "en"
}
```

All fields are optional and will use the default values if not specified.

Check [Default Options](#default-options) to see full list of available options.

## Output directory name template

The `outDir` template (specified with `--out-dir` option) supports the following variables:

- `{name}` - Project name
- `{version}` - Project version
- `{language}` - Language code
- `{platform}` - Target platform
- `{date}` - Current date
- `{hash}` - Unique build identifier

Example: `--out-dir "build/{name}_{version}_{platform}"`

## Defines

The following global defines are automatically available in your code during development and build:

| Define     | Description                              | Example Value               |
| ---------- | ---------------------------------------- | --------------------------- |
| `__DEV__`  | Boolean flag indicating development mode | `true` or `false`           |
| `PLATFORM` | Current target platform identifier       | `"browser"`, `"poki"`, etc. |
| `LANGUAGE` | Current language code                    | `"en"`, `"es"`, etc.        |

These defines can be used in your code for conditional logic:

```javascript
if (__DEV__) {
  console.log('Debug mode is active');
}

if (PLATFORM === 'poki') {
  // Poki-specific code
}

console.log(`Current language: ${LANGUAGE}`);
```

You can also add custom defines by modifying the `defines` property in your build.json file:

```json
{
  "defines": {
    "CUSTOM_DEFINE": "'custom value'",
    "FEATURE_FLAG": "true"
  }
}
```

## Meta Tags

Unless `--skip-recommended-meta` is provided, the following recommended for mobile platforms meta tags are automatically injected:

```html
<meta name="HandheldFriendly" content="True" />
<meta name="cleartype" http-equiv="cleartype" content="on" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
```

## Examples

### Development

Start development server:

```bash
smoud-scripts dev --port 3000 --open
```

### Building

Build for browser:

```bash
npx smoud-scripts build browser
```

```bash
npm run build browser
```

Build for Poki:

```bash
npx smoud-scripts build poki
```

```bash
npm run build poki
```

Build for Facebook:

```bash
npx smoud-scripts build facebook
```

```bash
npm run build facebook
```

## API Reference

The package provides a programmatic API for integration into your build tools:

### Default Options

```javascript
const options = {
  // CLI options
  name: '', // Project name (default from package.json)
  version: '', // Project version (default from package.json)
  outDir: 'build/{platform}', // Output directory for build files
  staticDir: 'static', // Source directory of static build files
  buildConfig: 'build.json', // Path to build.json configuration file
  tsConfig: 'tsconfig.json', // For TypeScript projects, path to tsconfig.json file
  jsConfig: 'jsconfig.json', // For JavaScript projects, path to jsconfig.json file
  port: 3000, // Development server port number
  open: false, // Whether to open browser automatically
  platform: 'browser', // Target platform
  language: 'auto', // Target language
  dev: undefined, // Development mode flag
  skipRecommendedMeta: undefined, // Skip recommended meta tags injection
  debugger: undefined, // URL of debugger script to inject
  defines: {} // Defines options
};
```

### Configuration

```javascript
const { options, mergeOptions, parseArgvOptions } = require('@smoud/scripts');

// Merge custom options with defaults
const customOptions = mergeOptions(options, {
  outDir: 'custom-dist',
  platform: 'poki'
});

// Parse CLI arguments
const newOptions = parseArgvOptions([
  {
    name: 'custom-option',
    hasValue: true,
    defaultValue: 'default'
  }
]);

// Change options
newOptions.platform = 'crazygames';
newOptions.version = '1.0.5';

// Change defines options
newOptions.defines = {
  CUSTOM_DEFINE: JSON.stringify('custom value'),
  __DEV__: JSON.stringify(false)
};

// Merge new options with defaults
const finalOptions = mergeOptions(options, newOptions);
```

### Webpack Configuration

```javascript
const { makeWebpackDevConfig, makeWebpackBuildConfig } = require('@smoud/scripts');
const { webpackCommonConfig } = require('@smoud/scripts');
const { merge } = require('webpack-merge');

// Create development configuration
const devConfig = makeWebpackDevConfig(customOptions);

// Create production configuration
const buildConfig = makeWebpackBuildConfig();

// Create production configuration with custom definitions
const buildConfig2 = makeWebpackBuildConfig(customOptions, customDefinitions);

// Create production configuration with custom definitions and custom webpack config to merge
const buildConfig3 = makeWebpackBuildConfig(customOptions, customDefinitions, customWebpackConfig);

// Create your own webpack config, based on webpackCommonConfig
const customConfig = merge(webpackCommonConfig, {
  // ...
});
```

### Development Server

```javascript
const { runDev } = require('@smoud/scripts');

// Start development server with custom config
runDev(webpackDevConfig);

// Start development server with default config
runDev();

// Start development server with custom definitions
runDev(null, null, customDefines);
```

### Production Build

```javascript
const { runBuild } = require('@smoud/scripts');

// Run production build with custom config
runBuild(webpackBuildConfig);

// Run production build with default config
runBuild();

// Run production build with custom options
runBuild(null, customOptions);
```

### Plugins

The package includes several webpack plugins for platform integration:

```javascript
const { DebuggerInjectionPlugin } = require('@smoud/scripts');

// Custom debugger integration
new DebuggerInjectionPlugin('http://debugger-url');
```

## Issues

Report issues at [GitHub Issues](https://github.com/smoudjs/scripts/issues)
