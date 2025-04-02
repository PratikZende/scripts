const { options } = require('../options');

/**
 * Build's default defines list for dev & prod builds
 */
exports.buildDefines = function buildDefines() {
  return {
    __DEV__: JSON.stringify(options.dev === undefined ? false : options.dev),
    APP_NAME: JSON.stringify(options.name),
    APP_VERSION: JSON.stringify(options.version),
    PLATFORM: JSON.stringify(options.platform),
    LANGUAGE: JSON.stringify(options.language)
  };
};
