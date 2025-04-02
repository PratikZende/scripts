/** @type {PLATFORM[]} List of supported advertising networks */
const allowedPlatforms = [
  'browser',

  // Web-Based Game Portals
  'crazygames',
  'poki',
  'kongregate',
  'newgrounds',
  'y8',
  'gamedistribution',
  'miniclip',

  // Indie-Focused & Pay-What-You-Want Platforms
  'itch',
  'gamejolt',
  'simmer',

  // Mobile Platforms (via WebView or PWA)
  'googleplay',
  'appstore',
  'galaxystore',
  'amazonappstore',

  // Social Media & Messenger Games
  'facebook',
  'snapchat',
  'wechat',
  'tiktok',
  'telegram',

  // Web3 & Blockchain-Based Platforms
  'sandbox',
  'opgames',
  'immutablex'
];

/** @type {LANGUAGE[]} */
const allowedLanguages = [
  'auto',
  'en',
  'es',
  'zh',
  'hi',
  'ar',
  'fr',
  'de',
  'ja',
  'pt',
  'it',
  'ko',
  'tr',
  'nl',
  'sv',
  'pl',
  'uk',
  'id',
  'vi'
];

/**
 * Parses command line arguments based on provided options configuration
 * @param {import('../index').CLIOptionConfig[]} possibleOptions - Array of possible options to parse
 * @returns {Record<string, any>} Parsed options object with values from command line arguments
 */
exports.parseArgvOptions = function parseArgvOptions(possibleOptions) {
  const argvOptions = {};

  for (let possibleOption of possibleOptions) {
    if (possibleOption.defaultValue !== undefined)
      argvOptions[possibleOption.alias || possibleOption.name] = possibleOption.defaultValue;
  }

  let platform = null;

  for (let i = 2; i < process.argv.length; i++) {
    let key = process.argv[i];

    const allowedOption = possibleOptions.find((e) => '--' + e.name === key);

    if (allowedOption) {
      let value = true;
      if (allowedOption.hasValue) {
        value = process.argv[i + 1];
        if (allowedOption.parser) value = allowedOption.parser(value);
        i++;
      }
      argvOptions[allowedOption.alias || allowedOption.name] = value;
    } else if (!platform) platform = key;
  }

  if (possibleOptions.find((e) => e.name === 'platform')) {
    if (platform && allowedPlatforms.includes(platform)) {
      argvOptions['platform'] = platform;
    }
  }

  return argvOptions;
};

exports.allowedPlatforms = allowedPlatforms;
exports.allowedLanguages = allowedLanguages;