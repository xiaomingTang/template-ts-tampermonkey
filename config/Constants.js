const isProduction = process.env.NODE_ENV !== "development"

const Constants = {
  isProduction,
  autoCopy: isProduction,
  suffix: "\n",
  prefix: `
// ==UserScript==
// @name         template-ts-tampermonkey
// @author       xiaoming
// @match        https://www.baidu.com/*
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  tampermonkey + typescript, built-in functions available
// @require      https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==


`,
  // src 中用到的tampermonkey内置函数, 均需要在 prefix 中声明 @grant
  externals: {
    /**
     * externals中用到的包, 应当
     * 1. 需要在 prefix 中声明 @require
     * 2. 应当执行 yarn add *** --dev 将之作为devDependencies, 以便在development环境下运行
     */
    lodash : "_",
  }
}

module.exports = Constants
