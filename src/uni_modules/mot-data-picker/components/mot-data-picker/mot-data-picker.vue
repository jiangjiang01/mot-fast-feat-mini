<!-- 负责选中内容，或者称为表单 -->
<template>
  <view class="mot-data-tree">
    <!-- 作用域插槽、用于定义选中的内容,有内容则替换，无内容则显示 -->
    <view class="mot-data-tree-input" @click="handleInput">
      <slot name="default" :options="options" :data="inputSelected">
        <view class="input-value" :class="{ 'input-value-border': border }">
          <scroll-view v-if="inputSelected.length" class="selected-area" scroll-x="true">
            <view class="selected-list">
              <view v-for="(item, index) in inputSelected" :key="index" class="selected-item">
                <text class="text-color">{{ item[textField] }}</text>
                <text v-if="index < inputSelected.length - 1" class="input-split-line">{{ split }}</text>
              </view>
            </view>
          </scroll-view>
          <text v-else class="selected-area placeholder">{{ placeholder }}</text>
          <view
            v-if="clearIcon && !props.disabled && inputSelected.length"
            class="close slot-close"
            @click.stop="clear"
          >
            <view class="close-plus" data-id="close"></view>
            <view class="close-plus close-rotate" data-id="close"></view>
          </view>
          <view v-if="(!clearIcon || !inputSelected.length) && !props.disabled" class="arrow-area">
            <view class="input-arrow"></view>
          </view>
        </view>
      </slot>
    </view>
    <!-- 遮罩层 -->
    <view v-if="isOpened" class="mot-data-tree-cover" @touchmove.stop.prevent="() => {}" @click="handleClose"></view>
    <!-- 弹框 -->
    <view v-if="isOpened" class="mot-data-tree-dialog" @touchmove.stop.prevent="() => {}">
      <!-- <view class="mot-popper__arrow">123</view> -->
      <!-- 顶部 -->
      <view class="dialog-caption">
        <!-- title -->
        <!-- <view class="title-area">
          <text class="dialog-title">{{ popupTitle }}popupTitle</text>
        </view> -->
        <!-- 关闭 -->
        <view class="close picker-view-close" @click="handleClose">
          <view class="close-plus" data-id="close"></view>
          <view class="close-plus close-rotate" data-id="close"></view>
        </view>
      </view>
      <data-picker-view
        v-if="slotScrollItems"
        ref="pickerView"
        class="picker-view"
        :deal-data="dealData"
        :field-names="fieldNames"
        :render-data="renderData"
        :multiple="multiple"
        :show-common-used-city="showCommonUsedCity"
        :multiple-text="multipleText"
        @change="onchange"
        @node-click="onNodeClick"
      >
        <template #scrollItems="scrollItems">
          <slot name="scrollItems" :scroll-items="scrollItems"></slot>
        </template>
      </data-picker-view>
      <data-picker-view
        v-else
        ref="pickerView"
        class="picker-view"
        :deal-data="dealData"
        :field-names="fieldNames"
        :render-data="renderData"
        :multiple="multiple"
        :show-common-used-city="showCommonUsedCity"
        :multiple-text="multipleText"
        @change="onchange"
        @node-click="onNodeClick"
      >
      </data-picker-view>
    </view>
  </view>
</template>

<script setup lang="ts" name="motPicker">
import { ref, watch, useSlots } from 'vue';
import DataPickerView from './mot-data-picker-view.vue';
import type { OriginDataType, DataListViewItem, DealDataType, ModelValueType, FieldNamesProps } from './type';
import { dealDataFn, _findNodePath, comProps } from './utils';

const slotScrollItems = !!useSlots()?.scrollItems;
const props = defineProps({
  ...comProps,
  options: {
    // 开发者自定有数据，用于控制插槽显示，非常灵活
    type: [Object, Array],
    default() {
      return {};
    }
  },
  // 弹框 title
  popupTitle: {
    type: String,
    default: '请选择'
  },
  // 下拉框 placeholder
  placeholder: {
    type: String,
    default: '请选择'
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否提供删除 icon
  clearIcon: {
    type: Boolean,
    default: true
  },
  // 是否有边框
  border: {
    type: Boolean,
    default: true
  },
  // 分割符
  split: {
    type: String,
    default: '/'
  }
});

/**
 * popupOpened 弹框打开后触发
 * popupClosed 弹框关闭后触发
 * nodeClick 节点点击后触发
 * change 选中值变化后触发
 * update:modelValue 选中值变化后触发
 * inputClick 输入框点击后触发
 */
const emits = defineEmits(['popupOpened', 'popupClosed', 'nodeClick', 'change', 'update:modelValue', 'inputClick']);

const isOpened = ref(false);
const pickerView = ref();
// 作用域插槽的参数
const inputSelected = ref([] as DataListViewItem[]);
const dealData = ref<DealDataType[]>([]);

const textField = props.fieldNames.text as Exclude<keyof typeof props.fieldNames, 'children'>;
const valueKey = props.fieldNames.value as Exclude<keyof typeof props.fieldNames, 'children'>;

// 监听数据
watch(
  () => props.renderData,
  (newValue) => {
    if (newValue && newValue.length) {
      const res = dealDataFn(newValue as OriginDataType[], [], null, props);
      dealData.value = res;
    }
  },
  {
    immediate: true
  }
);

watch(
  () => props.modelValue,
  () => {
    // 处理回显
    if (!props.modelValue) {
      inputSelected.value = [];
      return;
    }
  }
);

watch(
  () => pickerView.value,
  () => {
    // 处理回显
    if (!props.modelValue) {
      inputSelected.value = [];
      return;
    }
    if (props.multiple && !Array.isArray(props.modelValue)) throw Error('v-model， modelValue must be an array');
    else if (!props.multiple && !(typeof props.modelValue === 'number' || typeof props.modelValue === 'string')) {
      throw Error('v-model，modelValue must be an string or number');
    }
    const modelValue = props.modelValue as ModelValueType;
    const modelValueArray = Array.isArray(modelValue) ? modelValue : [modelValue];
    const selected = modelValueArray.reduce((accumulator, modelValue) => {
      const res = _findNodePath(modelValue, props.renderData as OriginDataType[], [], props.fieldNames);
      const data = [...accumulator, ...res];
      // 去重
      console.log(data, modelValue, 'selected');

      return Array.from(new Set(data.map(JSON.stringify as any))).map(JSON.parse as any);
    }, [] as DataListViewItem[]);
    inputSelected.value = selected;
    pickerView?.value?.updateData({ selected });
  },
  {
    immediate: true
  }
);

// 清空选中数据
const clear = () => {
  console.log('clear');

  _dispatchEvent([]);
};
// 显示弹框
const show = () => {
  isOpened.value = true;
  emits('popupOpened');
};
// 关闭弹框
const hide = () => {
  isOpened.value = false;
  emits('popupClosed');
};
// 点击组件，打开弹框
const handleInput = () => {
  // 只读
  if (props.disabled) return;
  emits('inputClick');
  show();
};
// 关闭弹框
const handleClose = () => {
  hide();
};
// 节点点击
const onNodeClick = (e: DataListViewItem) => {
  emits('nodeClick', e);
};
// 所有的值选择完毕
const onchange = (e: DataListViewItem[]) => {
  hide();
  inputSelected.value = e;
  _dispatchEvent(e);
};

// 批量触发事件，用于更新值
const _dispatchEvent = (paramsInputSelected: FieldNamesProps[]) => {
  let item: Record<string, any> = {};
  if (paramsInputSelected.length) {
    const value = new Array(paramsInputSelected.length);
    for (let i = 0; i < paramsInputSelected.length; i++) {
      value[i] = paramsInputSelected[i].value;
    }
    item = paramsInputSelected[paramsInputSelected.length - 1];
  } else {
    item.value = '';
  }
  if (props.multiple) {
    const arr = paramsInputSelected.slice(3).map((item) => item.value) ?? [];
    emits('update:modelValue', arr);
  } else {
    const item = paramsInputSelected[paramsInputSelected.length - 1] ?? ({} as FieldNamesProps);
    emits('update:modelValue', item.value);
  }
  inputSelected.value = paramsInputSelected;
  emits('change', paramsInputSelected);
};

defineExpose({
  handleNodeClick: (...rest) => pickerView?.value?.handleNodeClick(...rest)
});
</script>

<style lang="scss">
.mot-data-tree {
  flex: 1;
  position: relative;
  font-size: $font-size;
  overflow: hidden;

  .mot-data-tree-input {
    .input-value {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: $font-size;
      padding: 0 10px;
      padding-right: 5px;
      overflow: hidden;
      height: 35px;
      box-sizing: border-box;

      .selected-area {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: row;

        .selected-list {
          display: flex;
          flex-flow: row nowrap;

          .selected-item {
            flex-direction: row;
            white-space: nowrap;

            .text-color {
              color: #333;
            }

            .input-split-line {
              opacity: 0.5;
            }
          }
        }
      }

      .placeholder {
        color: grey;
        font-size: $font-size;
      }

      .arrow-area {
        position: relative;
        width: 20px;
        margin-bottom: 5px;
        margin-left: auto;
        display: flex;
        justify-content: center;
        transform: rotate(-45deg);
        transform-origin: center;

        .input-arrow {
          width: 7px;
          height: 7px;
          border-left: 1px solid #999;
          border-bottom: 1px solid #999;
        }
      }
    }

    .input-value-border {
      border: 1px solid #e5e5e5;
      border-radius: 5px;
    }
  }

  .mot-data-tree-cover {
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 40%);
    display: flex;
    flex-direction: column;
    z-index: 100;
  }

  .mot-data-tree-dialog {
    position: fixed;
    left: 0;
    top: 20%;
    top: 200px;
    // max-height: 1176rpx;
    // min-height: 300rpx;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    flex-direction: column;
    z-index: 102;
    overflow: hidden;
    width: 750rpx;

    .dialog-caption {
      position: relative;
      display: flex;
      flex-direction: row;

      .title-area {
        display: flex;
        align-items: center;
        margin: auto;
        padding: 0 10px;

        .dialog-title {
          line-height: 44px;
        }
      }
    }
  }
}

.close {
  position: absolute;
  top: 50rpx;
  right: 36rpx;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32rpx;
  width: 32rpx;
  z-index: 99;

  .close-plus {
    width: 16px;
    height: 3.5rpx;
    background-color: #272636;
    border-radius: 2px;
    transform: rotate(45deg);
  }

  .close-rotate {
    position: absolute;
    transform: rotate(-45deg);
  }
}

.picker-view-close {
  padding: 15rpx;
  top: 25rpx;
  right: 20rpx;
}

.slot-close {
  position: static;
  padding: 6rpx;
  border-radius: 50%;
  background-color: #ddd;
  width: 24rpx;
  height: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .close-plus {
    width: 16rpx;
    height: 1px;
    background-color: #666;
  }
}

.picker-view {
  flex: 1;
  overflow: hidden;
}

/* #ifdef H5 */
@media all and (width >= 768px) {
  .mot-data-tree-cover {
    background-color: transparent;
  }

  .mot-data-tree-dialog {
    position: absolute;
    top: 55px;
    height: auto;
    min-height: 400px;
    max-height: 50vh;
    background-color: #fff;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    overflow: unset;
  }

  .dialog-caption {
    display: none;
  }
}

/* #endif */
</style>
