# 级联框 mot-data-picker

## 需求背景

目的有两个

- 为了统一小铁所有的级联组件交互和样式
- 为了提高开发者开发效率，统一输出参数，要求后端接收相应的参数「非强制」

## 相关文档及外部依赖

0 外部依赖

## 设计图

mot-picker/index 负责数据显示
mot-pickerView 负责渲染级联数据

## 方案详情

### 功能

1. 符合数据符合嵌套格式，天然支持单列、和多列级联选择。列数没有限制，如果屏幕显示不全，顶部tab区域会左右滚动。
   1. fieldNames: { label: label, value: value, children: children }，可以自定义字段名称
   2.  2.支持 1.省市区「不需要读取数据」2.其他的级联情况，开发者喂数据进来 需要符合嵌套格式

-  回显示是支持默认 slot，开发者可以自定义显示内容
- 支持多选

### props 详解



| 属性名             | 说明                                                         | 类型          | default                                            |
| ------------------ | ------------------------------------------------------------ | ------------- | -------------------------------------------------- |
| modelValue/v-model | 绑定值，用于开发获取值，用于组件内部回显使用<br />支持多种数据格式，开发者输入什么，到时候拿到的就是什么，也可以在 change 事件获取最全的数据 | String、Array | —                                                  |
| multiple           | 支持多选，如何设置了多选，modelValue 就要求是 array          | Boolean       | —                                                  |
| fieldNames         | 字段定义                                                     | Object        | {text: 'text',value: 'value',children: 'children'} |
| options            | 开发者自定义数据，用于控制插槽显示，非常灵活，这个属性用途是，想自定义替换插槽的内容，这样就可以利用 options 参数进行数据渲染，它和data的区别是，data是组件内部的选择的项，options 可以是开发者自己定义的数据，提供更大的拓展性，具体查看实例代码 | Object, Array | {}                                                 |
| renderData         | 渲染数据                                                     | Array         | []                                                 |
| ~~popupTitle~~     | ~~属性暂时废弃，ui 没有，功能是有的，但是注释了~~            | ~~String~~    | ~~请选择~~                                         |
| placeholder        | placeholder                                                  | String        | 请选择                                             |
| disabled           | 禁用，只读功能，点击是没有反应的                             | Boolean       | false                                              |
| clearIcon          | 清除按钮                                                     | Boolean       | false                                              |
| split              | 分隔符                                                       | String        | /                                                  |
| border             | 边框                                                         | Boolean       | false                                              |
| multipleText       | 定义了多选，底部会弹起具体的文字，可以定义                   | String        | 项                                                 |



## 案例

```vue
<template>
  <view class="container">
    <div class="item">
      <div>回显数据 {{ value }}</div>
      <mot-data-picker
        v-model="value"
        :render-data="testData"
        placeholder="请选择您的地区"
        :border="true"
        :multiple="false"
        :clear-icon="true"
        :split="'~'"
        :field-names="{
          text: 'text',
          value: 'value',
          children: 'child'
        }"
        @change="myTestFn($event, 'change')"
      ></mot-data-picker>
    </div>
    <div class="item">
      <div>普通数据嵌套数据</div>
      <mot-data-picker
        :render-data="testData"
        placeholder="请选择您的地区"
        :border="true"
        :multiple="false"
        :clear-icon="true"
        :split="'~'"
        :field-names="{
          text: 'text',
          value: 'value',
          children: 'child'
        }"
        @change="myTestFn($event, 'change')"
      ></mot-data-picker>
    </div>
    <div class="item">
      <div>多选</div>
      <mot-data-picker
        :render-data="areaData"
        placeholder="请选择您的地区"
        :border="true"
        :multiple="true"
        :clear-icon="true"
        :split="'~'"
        :field-names="{
          text: 'text',
          value: 'value',
          children: 'children'
        }"
        :multiple-text="'这是多选的文字配置，比如「家店」「区或县」'"
        @change="myTestFn($event, 'change')"
      ></mot-data-picker>
    </div>
    <div class="item">
      <div>禁用</div>
      <mot-data-picker
        v-model="value2"
        :render-data="areaData"
        placeholder="请选择您的地区"
        :border="true"
        :disabled="true"
        :clear-icon="true"
        :split="'~'"
        :field-names="{
          text: 'text',
          value: 'value',
          children: 'children'
        }"
        :multiple-text="'这是多选的文字配置，比如「家店」「区或县」'"
        @change="myTestFn($event, 'change')"
      ></mot-data-picker>
    </div>
    <div class="item">
      <div>更灵活的 slot 方式，定义 options</div>
      <mot-data-picker
        :render-data="areaData"
        placeholder="请选择您的地区"
        :border="true"
        :options="options"
        :clear-icon="true"
        :split="'~'"
        :field-names="{
          text: 'text',
          value: 'value',
          children: 'children'
        }"
        :multiple-text="'这是多选的文字配置，比如「家店」「区或县」'"
        @change="myTestFn($event, 'change')"
      >
        <template #default="params">
          <view v-if="params.options.length" class="selected-list">
            以下由开发者自定义option内容
            <view v-for="(item, index) in params.options" :key="index" class="selected-item">
              <text class="text-color">{{ item.text }}</text>
              <text class="input-split-line">/</text>
            </view>
          </view>

          <view v-if="params.data.length" class="selected-list">
            以下由开发者自定义data内容
            <view v-for="(item, index) in params.data" :key="index" class="selected-item">
              <text class="text-color">{{ item.text }}</text>
              <text class="input-split-line">/</text>
            </view>
          </view>
          <text v-else class="selected-area placeholder">请选择</text>
        </template>
      </mot-data-picker>
    </div>
  </view>
</template>
<script setup lang="ts">
import areaData from './areaData';
import { ref } from 'vue';

const value = ref('333');
const value2 = ref('130125');
const options = ref([]);

// 普通嵌套数据
const testData = [
  {
    text: 'text',
    value: '111',
    child: [
      {
        text: 'text-child',
        value: '222',
        child: [
          {
            text: 'text-grand',
            value: '333'
          }
        ]
      }
    ]
  }
];

const myTestFn = (e, text) => {
  console.log(e, text);

  options.value = e;
};
</script>
<style lang="scss">
.container {
  background-color: #fff;
}
.item {
  padding: 24rpx;
  margin: 24rpx;
}
</style>

```

