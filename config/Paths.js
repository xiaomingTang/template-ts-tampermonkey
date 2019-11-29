const path = require("path")

const appRoot = path.resolve(__dirname, "../")
const srcRoot = path.resolve(appRoot, "src")

const Paths = {
  Root: appRoot,
  Src: srcRoot,
  Public: path.resolve(appRoot, "public"),
  Dist: path.resolve(appRoot, "dist"),
  Config: path.resolve(appRoot, "config"),
  Pages: path.resolve(srcRoot, "pages"),
  Comps: path.resolve(srcRoot, "components"),
}

module.exports = Paths
