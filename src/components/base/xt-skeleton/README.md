# xt-button

## 代码演示

```vue
<!-- 默认骨架屏 -->
<xt-skeleton></xt-skeleton>
<!-- 自定义填充内容 -->
<xt-skeleton>
	<!-- 内容显示 -->
    <skeleton-item></skeleton-item>
</xt-skeleton>
```

## API

| 属性         | 类型             | 默认值        | 可选值 | 说明                                                 |
| ------------ | ---------------- | ------------- | ------ | ---------------------------------------------------- |
| block        | boolean          | true          | false  | 是否为块级                                           |
| bgColor      | string           | '#FFF'        | -      | 骨架屏背景颜色                                       |
| width        | [string, number] | 'fit-content' | -      | 骨架屏宽度，如果是`string`类型，请带上单位'px'或'rpx |
| customStyle  | Object           | -             | -      | 自定义父级样式                                       |
| childBgColor | string           | '\#0000000F'  | -      | 骨架屏内容颜色                                       |

## Slot

| 插槽名  | 说明              |
| ------- | ----------------- |
| default | 默认插槽，ui 组件 |
