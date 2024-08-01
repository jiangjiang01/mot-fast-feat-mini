# xt-button

## 代码演示

```vue
<!-- 默认按钮 -->
<xt-button>按钮</xt-button>
```

## API

| 属性        | 类型             | 默认值        | 可选值                   | 说明                                               |
| ----------- | ---------------- | ------------- | ------------------------ | -------------------------------------------------- |
| type        | string           | 'default'     | 'primary', 'danger'      | 类型                                               |
| round       | boolean          | false         | true                     | 是否为圆形按钮                                     |
| text        | boolean          | false         | true                     | 是否为文本                                         |
| block       | boolean          | false         | true                     | 是否为块级                                         |
| size        | string           | 'default'     | 'mini', 'small', 'large' | 尺寸                                               |
| color       | string           | '#333'        | -                        | 按钮字体颜色                                       |
| bgColor     | string           | '#FFF'        | -                        | 按钮背景颜色                                       |
| borderColor | string           | ''            | -                        | 按钮边框颜色，不传默认背景颜色                     |
| width       | [string, number] | 'fit-content' | -                        | 按钮宽度，如果是`string`类型，请带上单位'px'或'rpx |
| disabled    | boolean          | false         | true                     | 是否禁用按钮                                       |
| customStyle | Object           | -             | -                        | 自定义样式                                         |
