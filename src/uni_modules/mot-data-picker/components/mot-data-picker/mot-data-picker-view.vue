<!-- 负责弹框的内容 -->
<template>
  <view class="mot-data-picker-view">
    <!-- 选择后的省市区名称，超出可以滚动，如果没有选择，则显示'请选择' -->
    <scroll-view class="selected-area" scroll-x="true">
      <view class="selected-list">
        <view
          v-for="(item, index) in selected"
          :key="index"
          class="selected-item"
          :class="{
            'selected-item-active': index == selectedIndex,
            'selected-item-text': index == selectedIndex,
          }"
          @click="handleSelect(index)"
        >
          <text v-if="index <= selectedIndex">{{ item[textField] || "" }}</text>
        </view>
      </view>
    </scroll-view>
    <!-- 常用城市 -->
    <view
      v-if="selectedIndex === 0 && showCommonUsedCity"
      class="common-used-city"
    >
      <view class="common-used-city-title">常用城市</view>
      <view class="common-used-city-list">
        <view
          v-for="(item, index) in commonUsedCityList"
          :key="index"
          class="common-used-city-item"
          @click="commonUsedCityClick(item)"
          >{{ item[textField] }}</view
        >
      </view>
    </view>
    <!-- 真正可以选择的内容 -->
    <view class="tab-c">
      <scroll-view class="list" :scroll-y="true">
        <slot
          name="scrollItems"
          :list="dataList[selectedIndex]"
          :selected="selected"
          :selected-index="selectedIndex"
        >
          <view
            v-for="(item, j) in dataList[selectedIndex]"
            :key="j"
            class="item"
            :class="{ 'is-disabled': !!item.disable }"
            @click="handleNodeClick(item, selectedIndex, j)"
          >
            <text class="item-text">{{ item[textField] }}</text>
            <view class="check-container">
              <view
                v-if="selected.length && judgeItemSelected(item[valueField])"
              >
                <view v-if="multiple" class="multiple-check">
                  <view class="check"></view>
                </view>
                <view v-else class="check"></view>
              </view>
              <view v-else>
                <view v-if="multiple" class="multiple-no-check"></view>
              </view>
            </view>
          </view>
        </slot>
      </scroll-view>
    </view>
    <!-- 选好了 -->
    <view v-if="isLeaf && multiple" class="footer-container">
      <view class="left">
        已选：<text
          >{{ selected.length - selectedIndex }} {{ multipleText }}</text
        >
      </view>
      <view class="right" @click="confirm">选好了</view>
    </view>
  </view>
</template>

<script setup lang="ts" name="DataPickerView">
import type {
  DataListViewItem,
  DealDataType,
  FieldNamesProps,
  OriginDataType,
} from "./type";
import {
  _updateBindData,
  comProps,
  getCommonUsedCityList,
  _findNodePath,
  setStorageCommonUsedCityList,
} from "./utils";
import type { PropType } from "vue";
import { ref, watch } from "vue";

const props = defineProps({
  dealData: {
    type: Array as PropType<DealDataType[]>,
    default: () => {
      return [];
    },
  },
  ...comProps,
});

const emits = defineEmits(["nodeClick", "change", "update:modelValue"]);

const textField = props.fieldNames.text as Exclude<
  keyof typeof props.fieldNames,
  "children"
>;
const valueField = props.fieldNames.value as Exclude<
  keyof typeof props.fieldNames,
  "children"
>;
const selectedIndex = ref(0);
const selected = ref([] as DataListViewItem[]);
const dataList = ref([] as DataListViewItem[][]);
const commonUsedCityList = ref([] as DataListViewItem[][]);
const isLeaf = ref(false);

const updateSelected = () => {
  selectedIndex.value = dataList.value.length - 1;

  if (selected.value.length < dataList.value.length) {
    selected.value.push({
      [valueField]: null,
      [textField]: "请选择",
    } as unknown as FieldNamesProps);
    isLeaf.value = false;
  } else {
    isLeaf.value = true;
  }
};

// 提供父组件调用的方法回显数据
const updateData = (data: { selected: DataListViewItem[] }) => {
  selected.value = data.selected;
  const resDataList = _updateBindData(
    props.dealData as DealDataType[],
    selected.value
  );
  dataList.value = resDataList;
  updateSelected();
};

const judgeItemSelected = (value: string | null) => {
  const res = selected.value.findIndex((select) => select.value === value);
  return res > -1 ? true : false;
};

// 监听数据
watch(
  () => props.dealData,
  (newValue) => {
    if (newValue && newValue.length) {
      const resDataList = _updateBindData(
        newValue as DealDataType[],
        selected.value
      );
      dataList.value = resDataList;
      // 更新选中内容后，同步更新顶栏
      updateSelected();
      // 输出常用城市
      commonUsedCityList.value = getCommonUsedCityList(props.fieldNames);
    }
  },
  {
    immediate: true,
  }
);

// 切换顶栏，省市区
const handleSelect = (index: number) => {
  selectedIndex.value = index;
};

// 常用城市
const commonUsedCityClick = (node: FieldNamesProps) => {
  const paths = _findNodePath(
    node.value,
    props.renderData as OriginDataType[],
    [],
    props.fieldNames
  );
  selectItem(paths[0], 0);
  selectItem(paths[1], 1);
};

// 点击了每一栏的内容
const handleNodeClick = (
  item: DataListViewItem,
  paramsSelectedIndex: number,
  j: number
) => {
  console.log(item, paramsSelectedIndex, j, "handleNodeClick");
  if (item.disable) {
    return;
  }
  // TODO: 这里可能会存在bug，因为存在二级都会走这里，加了判断是需要显示常用城市才可以添加
  // 未来防范是不需要用户喂数据进来，自动加载 cdn 的地址数据
  if (paramsSelectedIndex === 1 && props.showCommonUsedCity) {
    setStorageCommonUsedCityList([item]);
  }

  const node = dataList.value[paramsSelectedIndex][j];
  selectItem(node, paramsSelectedIndex);
};

const selectItem = (node, paramsSelectedIndex) => {
  const text = node[textField];
  const value = node[valueField];

  // 已选择省市区，回退至省或市，需要删除已选择的选项
  if (paramsSelectedIndex < dataList.value.length - 1) {
    selected.value.splice(
      paramsSelectedIndex,
      selected.value.length - paramsSelectedIndex
    );
    selected.value.push({
      [textField]: text,
      [valueField]: value,
    } as unknown as DataListViewItem);
  }
  // 增加选项
  else if (paramsSelectedIndex === selected.value.length - 1) {
    if (props.multiple && isLeaf.value) {
      const len = selected.value.length;
      // 过滤重复点击的
      selected.value = selected.value.filter((item) => item.value !== value);
      // 长度相等，增新增
      if (selected.value.length === len) {
        selected.value.push({
          [textField]: text,
          [valueField]: value,
        } as unknown as DataListViewItem);
      }
    } else {
      selected.value.splice(paramsSelectedIndex, 1, {
        [textField]: text,
        [valueField]: value,
      } as unknown as DataListViewItem);
    }
  } else {
    if (props.multiple && isLeaf.value) {
      const len = selected.value.length;
      // 过滤重复点击的
      selected.value = selected.value.filter((item) => item.value !== value);
      // 长度相等，增新增
      if (selected.value.length === len) {
        selected.value.push({
          [textField]: text,
          [valueField]: value,
        } as unknown as DataListViewItem);
      }
    }
  }

  const resDataList = _updateBindData(
    props.dealData as DealDataType[],
    selected.value
  );

  dataList.value = resDataList;

  // 更新选中内容后，同步更新顶栏
  updateSelected();

  // 触发节点点击事件
  if (node) {
    emits("nodeClick", node);
  }
  // 如果是叶子结点，证明选完了，通知父组件数据变化,多选除外
  if (isLeaf.value && !props.multiple) {
    emits("change", selected.value);
  }
};

// 多选选好了
const confirm = () => {
  emits("change", selected.value);
};

defineExpose({
  updateData,
  handleNodeClick,
  judgeItemSelected,
});
</script>

<style lang="scss">
$primary-color: #007aff !default;

.mot-data-picker-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.selected-area {
  // width: 750rpx;
  padding: 0 28rpx;
  height: 120rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1rpx solid #e3e3e3;

  .selected-list {
    width: 650rpx;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    overflow: hidden;
    overflow-x: auto;

    .selected-item {
      white-space: nowrap;
      font-size: 28rpx;
      color: #666;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-right: 82rpx;
      border-bottom: 8rpx solid transparent;
    }

    .selected-item-active {
      border-bottom: 8rpx solid $primary-color;
    }

    .selected-item-text {
      color: #333;
      font-weight: 600;
    }
  }
}

.common-used-city {
  margin: 48rpx 28rpx 0;

  &-title {
    color: #555;
    font-weight: 700;
  }

  &-list {
    width: 100%;
    display: flex;
    margin-top: 12rpx;
    flex-wrap: wrap;

    .common-used-city-item {
      // flex: 1;
      box-sizing: border-box;
      width: 24%;
      height: 88rpx;
      line-height: 28rpx;
      text-align: center;
      background: #f4f4f4;
      border-radius: 24rpx;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      padding: 30rpx 15rpx;
      margin-top: 24rpx;

      /* 如果最后一行是3个元素 */
      &:last-child:nth-child(4n - 1) {
        margin-right: calc(24% + 4% / 3);
      }

      /* 如果最后一行是2个元素 */
      &:last-child:nth-child(4n - 2) {
        margin-right: calc(48% + 8% / 3);
      }

      &:not(:nth-child(4n)) {
        margin-right: calc(4% / 3);
      }
    }
  }
}

.tab-c {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .list {
    flex: 1;
    margin-top: 15rpx;

    .item {
      padding: 12px 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .item-text {
        /* flex: 1; */
        color: #333;
      }

      .check-container {
        display: flex;
        align-items: center;
        justify-content: center;

        .multiple-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42rpx;
          height: 42rpx;
          background: $primary-color;
          border-radius: 50%;

          .check {
            border-color: #333;
          }
        }

        .check {
          margin-left: 5px;
          margin-top: -5rpx;
          border: 2px solid $primary-color;
          border-left: 0;
          border-top: 0;
          height: 20rpx;
          width: 10rpx;
          transform-origin: center;
          transition: all 0.3s;
          transform: rotate(45deg);
        }

        .multiple-no-check {
          box-sizing: border-box;
          width: 42rpx;
          height: 42rpx;
          border-radius: 50%;
          border: 2rpx solid #cbcbcb;
        }
      }
    }

    .is-disabled {
      opacity: 0.5;
    }
  }
}

.footer-container {
  box-sizing: border-box;
  border-top: 1rpx solid #e0e0e0;
  background: #fff;
  height: 150rpx;
  display: flex;
  justify-content: space-between;
  padding: 24rpx 32rpx;

  .left {
    font-size: 24rpx;

    text {
      color: #999;
    }
  }

  .right {
    width: 160rpx;
    height: 88rpx;
    line-height: 80rpx;
    border-radius: 114rpx;
    text-align: center;
    color: #333;
    font-size: 28rpx;
    background-color: $primary-color;
  }
}
</style>
