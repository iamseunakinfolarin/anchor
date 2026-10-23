// Keeps Metro out of video/ — the Remotion project is a separate npm workspace with
// its own React DOM dependency tree, and crawling it only slows the app bundler down.
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const videoFolder = /.*\/video\/.*/;
const { blockList } = config.resolver;
config.resolver.blockList = Array.isArray(blockList)
  ? [...blockList, videoFolder]
  : blockList
    ? [blockList, videoFolder]
    : [videoFolder];

module.exports = config;
