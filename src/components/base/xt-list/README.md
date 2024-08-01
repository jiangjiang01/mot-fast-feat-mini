# xt-list 上拉下拉刷新组件

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <xt-list :dataList="data" @refresherpulling="onPull" @scrolltolower="onLower">
    <!-- 数据显示 -->
    <template v-slot>
      <list-item />
    </template>
  </xt-list>
</template>

<script setup lang="ts">
const data = ref([]); // 数据

function onPull() {}
function onLower() {}
</script>
```

## API

| 属性             | 类型           | 默认值 | 可选值               | 说明                          |
| ---------------- | -------------- | ------ | -------------------- | ----------------------------- |
| dataList         | Array<Object>  | -      | -                    | 数据                          |
| lowerThreshold   | number, string | 50     | -                    | 距底部触发 scrolltolower 事件 |
| refresherEnabled | booelan        | true   | false                | 开启自定义下拉刷新            |
| moreStatus       | string         | 'more' | 'loading', 'no-more' | 底部状态展示                  |

## Event

| 事件名称          | 说明         | 返回值 |
| ----------------- | ------------ | ------ |
| @refresherpulling | 下拉刷新触发 | -      |
| @scrolltolower    | 滚动底部触发 | -      |

## Slot

| 插槽名  | 说明              |
| ------- | ----------------- |
| default | 默认插槽，ui 组件 |
