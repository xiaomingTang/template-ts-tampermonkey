# template-ts-tampermonkey

### description
让油猴也能用上**typescript**

### start
```
# cmd
git clone git@github.com:xiaomingTang/template-ts-tampermonkey.git
```

### usage
- **yarn start**: 经由**WebpackDevServer**+**HotModuleReplacementPlugin**, 尽享更畅快的开发
- **yarn run build**: 构建到**dist**目录, 且自动复制到剪贴板, 之后手动拷贝到油猴输入框即可
- **yarn run bundle**: 调用Webpack Bundle Analyzer分析打包情况(虽然没必要...)

### 项目特点
- 由[template-ts-browser](https://github.com/xiaomingTang/template-ts-browser)模板生成
- 自动添加油猴脚本描述(需配置**./config/Constants.js**中的*prefix*属性)
- 自动复制到剪贴板
- [x] eslint
- [x] typescript
- [ ] 要是有人用就上*react*+*antd*
