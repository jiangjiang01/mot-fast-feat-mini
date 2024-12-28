<template>
  <uni-popup ref="popup" type="bottom" :safe-area="false" :is-mask-click="false">
    <view class="mot-datetime" :style="{ height: isRangeCom ? 'calc(60vh)' : 'calc(50vh)' }">
      <view class="mot-datetime-header">
        <text @click="onClosePopup" style="padding-left: 28rpx;">取消</text>
        <view v-if="title" class="mot-datetime-header-title">{{ title }}</view>
        <mot-button text="确定" size="small" type="primary" @click="onConfirmDateTime"></mot-button>
      </view>
      <!-- 选择后的时间显示 -->
      <view v-if="isRangeCom" class="mot-datetime-edit">
        <view
          :class="['mot-datetime-edit__input', { 'mot-datetime-edit__input-selected': state.startTimeSelected }]"
          @click="chooseTime('startTimeSelected', 'endTimeSelected')"
        >
          <view class="mot-datetime-edit-desc">开始时间</view>
          <view :class="[!startTimeShow && 'no-value']">{{ startTimeShow || '未设置开始时间' }}</view>
        </view>
        <view class="mot-datetime-edit-decollator"><text class="icon iconfont icon-jiantou_qiehuanyou"></text></view>
        <view
          :class="['mot-datetime-edit__input', { 'mot-datetime-edit__input-selected': state.endTimeSelected }]"
          @click="chooseTime('endTimeSelected', 'startTimeSelected')"
        >
          <view class="mot-datetime-edit-desc">结束时间</view>
          <view :class="[!endTimeShow && 'no-value']">{{ endTimeShow || '未设置结束时间' }}</view>
        </view>
      </view>
      <view class="mot-datetime-select bg-card overflow-hidden">
        <picker-view
          :value="state.currentTimeIndex"
          class="mot-datetime-select__picker"
          immediate-change
          @change="onChangeDate"
        >
          <picker-view-column v-show="dateIncludeFormat('YYYY')">
            <view v-for="(item, index) in yearCom" :key="index" class="flex-center">
              {{ formatTxt(item, DateTypeEnum.year) }}
            </view>
          </picker-view-column>
          <picker-view-column v-show="dateIncludeFormat('MM')">
            <view v-for="(item, index) in monthCom" :key="index" class="flex-center">
              {{ formatTxt(item, DateTypeEnum.month) }}
            </view>
          </picker-view-column>
          <picker-view-column v-show="dateIncludeFormat('DD')">
            <view v-for="(item, index) in dayCom" :key="index" class="flex-center">
              {{ formatTxt(item, DateTypeEnum.day) }}
            </view>
          </picker-view-column>
          <picker-view-column v-show="dateIncludeFormat('HH')">
            <view v-for="(item, index) in additionsZero(hourCom)" :key="index" class="flex-center">
              {{ formatTxt(item, DateTypeEnum.hour) }}
            </view>
          </picker-view-column>
          <picker-view-column v-show="dateIncludeFormat('mm')">
            <view v-for="(item, index) in additionsZero(minuteCom)" :key="index" class="flex-center">
              {{ formatTxt(item, DateTypeEnum.minute) }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { FormatType, StateType, RangeType } from './type';
import { reactive, ref, computed } from 'vue';
import { additionsZero, formatTxt } from './util';
import { DateTypeEnum } from './const';
import { useDateFormatHook, useOperationHook, useInitHook, useDateRangeHook } from './hook';
const props = defineProps({
  //value值
  modelValue: {
    type: [String, Array<string>],
    required: true
  },
  //弹框是否显示
  visible: {
    type: Boolean,
    default: false
  },
  // 最大时间
  maxDate: {
    type: String,
    default: '2100-1-10'
  },
  // 最小时间
  minDate: {
    type: String,
    default: '1970-01-01'
  },
  // 弹框标题
  title: {
    type: String,
    default: ''
  },
  // 选择时间段
  isRange: {
    type: Boolean,
    default: false
  },
  // 当为HH:mm格式时启用间隔时间
  step: {
    type: Number,
    default: 1
  },
  format: {
    type: String as PropType<FormatType>,
    default: 'YYYY-MM-DD'
  }
});
const popup = ref();

const state: StateType = reactive({
  currentTimeIndex: [0, 0, 0, 0, 0],
  // 时间段
  timeRange: [],
  startTimeSelected: true,
  endTimeSelected: false
});
const emit = defineEmits(['update:visible', 'confirm', 'update:modelValue']);
const { yearCom, monthCom, dayCom, hourCom, minuteCom } = useDateFormatHook(props, state);
const { isRangeCom, dateIncludeFormat, setValue } = useInitHook({ props, state }, popup, {
  yearCom,
  monthCom,
  dayCom,
  hourCom,
  minuteCom
});
const { onClosePopup, onConfirmDateTime, selectRange, onChangeDate } = useOperationHook({ state, props }, emit, {
  yearCom,
  monthCom,
  dayCom,
  hourCom,
  minuteCom
});
const chooseTime = (start: RangeType, end: RangeType) => {
  selectRange(start, end).then((res) => {
    setValue(res);
  });
};

const { startTimeShow, endTimeShow } = useDateRangeHook(state);
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.mot-datetime-edit__input-selected {
  background-color: $warning-color-diabled;
  border: 2px solid $primary-color-light;
}
</style>
