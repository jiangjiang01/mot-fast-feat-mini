### mot-datetime-picker 组件开发

组件依赖 mot-botton/uni-popup

### 基本用法

```javascirpt

```
### props 
| 对象属性   | 类型                     | 默认值    | 注释                |
|------------|-------------------------|----------|---------------------|
| modelValue | String 或 Array<string> | 必填     | value值             |
| visible    | Boolean                 | false    | 弹框是否显示         |
| maxDate    | String                  | '2100-1-10' | 最大时间           |
| minDate    | String                  | '1970-01-01' | 最小时间         |
| title      | String                  | ''       | 弹框标题            |
| isRange    | Boolean                 | false    | 选择时间段          |
| step       | Number                  | 1        | 当为HH:mm格式时启用间隔时间 |
| format     | String                  | 'YYYY-MM-DD'/'YYYY-MM'/'YYYY'/'HH:mm'/'YYYY-MM-DD HH'/'YYYY-MM-DD HH:mm' |类型(根据这个去展示不同日期格式)               | 

### example
```html
<template>
  <view class="page container">
    <view><button @click="selectTypes('YYYY-MM-DD')">单个日期--年月日</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('YYYY-MM')">单个日期--年月</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('YYYY')">单个日期--年</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('HH:mm')">单个时间--时分</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('HH')">单个时间--时</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('YYYY-MM-DD HH')">单个日期时间--年月日时</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('YYYY-MM-DD HH:mm')">单个日期时间--年月日时分</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('YYYY-MM-DD',true)">日期范围--年月日</button> {{ settings.value }}</view>
    <view
      ><button @click="selectTypes('YYYY-MM-DD HH:mm',true)">日期时间范围--年月日时分</button> {{ settings.value
      }}</view
    >
    <view><button @click="selectTypes('HH:mm',true)">时间范围--时分</button> {{ settings.value }}</view>
    <view><button @click="selectTypes('YYYY-MM-DD HH',true)">时间范围--年月日时</button> {{ settings.value }}</view>
    <mot-datetime-picker
      v-model="settings.value"
      v-model:visible="settings.visable"
      type="primary"
      :min-date="settings.minDate"
      :max-date="settings.maxDate"
      :format="settings.format"
      :title="settings.title"
      :isRange="settings.isRange"
      @confirm="settings.confirm"
    ></mot-datetime-picker> </view
></template>
```

// YYYY-MM-DD new Date('2025-12-05')
// YYYY new Date('2025')
// YYYY-MM new Date('2025-12')
// MM-DD new Date('12-05')
// YYYY-MM-DD HH:mm new Date('2025-12-05 12:01')
// YYYY-MM-DD HH new Date('2025-12-05 12') // invalid
// HH:mm
// HH
