#motern-uni-ui

# 小铁组件库 使用于移动端

## 使用步骤

#### 第一步 将项目建成本地子仓库

```javascirpt
git submodule add git@e.coding.net:serverless-100013832940/smiron-web/motern-uni-ui.git  xxx/uni_modules
```

备注：xxx为本地根目录 xxx/uni_modules为本地根目录下的插件目录

例子：项目:table_web_mini xxx/uni_modules: web_mini/src/uni_modules

#### 第二步 直接使用组件

```javascirpt
  <mot-button disabled text="禁用按钮" size="normal" type="warning"></mot-button>
```
