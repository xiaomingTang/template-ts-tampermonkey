const isProduction = process.env.NODE_ENV !== "development"

/**
 * src 中用到的 tampermonkey 内置函数, 均需要在 prefix 中声明 @grant
 * 
 * externals 中用到的包, 应当
 * 1. 在 prefix 中声明 @require
 * 2. 执行 yarn add *** --dev 将之作为 devDependencies, 以便在 development 环境下运行
 */
const prefix = `
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
`

module.exports = {
  isProduction,
  autoCopy: isProduction,
  /**
   * 生产环境下, 由于代码被油猴在外面封装了一层, 所以不能 sourceMap
   * 而这儿的 productionSourceMap 仅仅是开启 development 模式, 让代码可读性稍微好一些
   * 建议设为 false
   */
  productionSourceMap: false,
  prefix,
  suffix: "\n",
  externals: {
    lodash : "_",
  }
}
