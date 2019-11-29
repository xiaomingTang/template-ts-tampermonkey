import "./index.scss"

const app = document.querySelector("#__tampermonkey__app")

const innerHTML = `
<div class="f13">
  某度中的<a href="javascript:;" class="__old-style">广告</a>字样经过处理后就是这样了:
  <a href="javascript:;" class="m">广告</a>
</div>
`

if (app) {
  app.innerHTML = innerHTML
}
