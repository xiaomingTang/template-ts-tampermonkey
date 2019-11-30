/* eslint-disable no-undef */
import * as lodash from "lodash"

import { log } from "@Src/utils"

import "./index.scss"

const app = document.querySelector("#__tampermonkey__app")

const innerHTML = `
<div class="f13">
  某度中的<a href="javascript:;" class="__old-style">广告</a>字样经过处理后就是这样了:
  <span href="javascript:;" class="m">广告</span>
</div>
`

if (app) {
  app.innerHTML = innerHTML
}

if (lodash.toUpper("abc") === "ABC") {
  log("external lodash is available")
}

if (process.env.NODE_ENV === "production") {
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.baidu.com",
    onreadystatechange() {
      log("GM_xmlhttpRequest is available")
    },
  })
} else {
  log("开发环境, 缺乏 GM_xmlhttpRequest")
}
