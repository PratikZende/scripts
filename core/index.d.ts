import { Configuration as WebpackConfig } from 'webpack';
import { WebpackPluginInstance } from 'webpack';

/** Supported file extensions for webpack resolution */
export declare const allowedExtensions: string[];

/** Base webpack configuration used by both development and build configs */
export declare const webpackCommonConfig: WebpackConfig;

/** Options for CLI arguments */
export interface CLIOptionConfig {
  name: string;
  alias?: string;
  hasValue?: boolean;
  defaultValue?: any;
  description: string;
  parser?: (value: string) => any;
}

/** Parse command line arguments based on configuration */
export declare function parseArgvOptions(possibleOptions: CLIOptionConfig[]): Record<string, any>;

/** Deep merge configuration options */
export declare function mergeOptions<T>(target: T, source?: Partial<T>): T;

/** CLI configuration options */
export interface CLIOptions {
  /** Project name (default from package.json) */
  name: string;
  /** Project version (default from package.json) */
  version: string;
  /** Output directory for build files (default: 'build/{platform}') */
  outDir: string;
  /** Source directory of static build files (default: 'static') */
  staticDir: string;
  /** Path to build.json configuration file (default: 'build.json') */
  buildConfig: string;
  /** Path to tsconfig.json configuration file (default: 'tsconfig.json') */
  tsConfig: string;
  /** Path to jsconfig.json configuration file (default: 'jsconfig.json') */
  jsConfig: string;
  /** Development server port number (default: 3000) */
  port: number;
  /** Whether to open browser automatically (default: false) */
  open: boolean;
  /** Target platform identifier (default: 'browser') */
  platform:
    | 'browser'
    | 'crazygames'
    | 'poki'
    | 'kongregate'
    | 'newgrounds'
    | 'y8'
    | 'gamedistribution'
    | 'miniclip'
    | 'itch'
    | 'gamejolt'
    | 'simmer'
    | 'googleplay'
    | 'appstore'
    | 'galaxystore'
    | 'amazonappstore'
    | 'facebook'
    | 'snapchat'
    | 'wechat'
    | 'tiktok'
    | 'telegram'
    | 'sandbox'
    | 'opgames'
    | 'immutablex';
  /** Target language identifier (default: 'auto') */
  language:
    | 'auto'
    | 'en'
    | 'es'
    | 'zh'
    | 'hi'
    | 'ar'
    | 'fr'
    | 'de'
    | 'ja'
    | 'pt'
    | 'it'
    | 'ko'
    | 'tr'
    | 'nl'
    | 'sv'
    | 'pl'
    | 'uk'
    | 'id'
    | 'vi';
  /** Development mode flag */
  dev: boolean;
  /** Skip recommended meta tags injection */
  skipRecommendedMeta?: boolean;
  /** URL of debugger script to inject */
  debugger?: string;
  /** Webpack define plugin configuration */
  defines: Record<string, string>;
}

/** Global options object */
export declare const options: CLIOptions;

/** Create webpack config for development */
export declare function makeWebpackDevConfig(
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): WebpackConfig;

/** Create webpack config for production build */
export declare function makeWebpackBuildConfig(
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): WebpackConfig;

/** Start webpack development server */
export declare function runDev(
  webpackConfig?: WebpackConfig,
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): void;

/** Run webpack production build */
export declare function runBuild(
  webpackConfig?: WebpackConfig,
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): void;

/** Plugin for injecting debugger script */
export declare class DebuggerInjectionPlugin implements WebpackPluginInstance {
  constructor(debuggerSrc: string);
  apply(compiler: any): void;
}
