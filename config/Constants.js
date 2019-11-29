const isProduction = process.env.NODE_ENV !== "development"

const Constants = {
  isProduction,
  autoCopy: isProduction,
  prefix: `
// ==UserScript==
// @name         Test scripts
// @author       xiaoming
// @match        https://www.baidu.com/*
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @grant        none
// ==/UserScript==


`,
}

module.exports = Constants
