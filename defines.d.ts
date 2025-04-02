declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.glb';
declare module '*.gltf';
declare module '*.mp3';

declare const PLATFORM:
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

declare const LANGUAGE:
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

declare const __DEV__: boolean;
