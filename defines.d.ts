declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.gif';
declare module '*.glb';
declare module '*.gltf';
declare module '*.fbx';
declare module '*.obj';
declare module '*.mp3';
declare module '*.ogg';
declare module '*.wav';

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

declare const APP_NAME: string;
declare const APP_VERSION: string;
declare const __DEV__: boolean;
