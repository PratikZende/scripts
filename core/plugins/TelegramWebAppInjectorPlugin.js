const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects Telegram Mini Apps script into the HTML head.
 * @implements {import('webpack').WebpackPluginInstance}
 */
class TelegramWebAppInjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('TelegramWebAppInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('TelegramWebAppInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            src: 'https://telegram.org/js/telegram-web-app.js',
            type: 'text/javascript'
          }
        });
        
        // data.bodyTags.push({
        //   tagName: 'script',
        //   voidTag: false,
        //   meta: { plugin: 'html-inline-script-webpack-plugin' },
        //   attributes: {
        //     src: 'https://telegram.org/js/games.js',
        //     type: 'text/javascript'
        //   }
        // });

        callback(null, data);
      });
    });
  }
}

exports.TelegramWebAppInjectorPlugin = TelegramWebAppInjectorPlugin;
