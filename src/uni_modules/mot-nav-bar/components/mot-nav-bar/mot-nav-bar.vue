<template>
  <view :class="classs" :style="style">
    <slot v-if="$slots.default"></slot>
    <template v-else>
      <i class="icon iconfont icon-arrow-left icon-large" :style="iconBackStyle" @click="back" v-if="!options.unshowLeftArrow"></i>
      <view class="mot-nav-bar-title" v-if="options.title"> {{ options.title }}</view>
    </template>
  </view>
</template>

<script lang="ts" setup>
/** 
 * 组合场景
 跟随页面滑动
 固定在顶部
 固定在顶部 滑动的时候页面背景颜色变化
 */
/**
 * function 返回组件
 * props title                   头部名称
 * props unshowLeftArrow         不展示返回按钮
 * props color                   设置字体颜色
 * props bgColor                 设置背景颜色--滑动的时候变化，如果是固定，建议直接使用原生态的
 * props fixed                   是否固定在头部
 * emit  back                    返回按钮事件
 * props zIndex                  层级
 */
import { computed } from 'vue';
import { useStyleHook } from './hook';
const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      title: '',
      unshowLeftArrow: false,
      color: '#000',
      fixed: false,
      bgColorDynac: false,
      zIndex: 1000
    })
  },
});

const options = computed(() => props.options);

//设置字体和图标颜色
const color = computed(() => props.options.color || '#000');

//设置背景颜色 
const bgColor = computed(() => props.options.bgColor || 'transparent');

//设置层级
const zIndex = computed(() => props.options.zIndex || 1000);

//设置组件样式
const { style, classs, iconBackStyle } = useStyleHook(props.options.fixed, props.options.bgColorDynac);

const $emit = defineEmits<{
  (e: 'back'): void;
}>();
const back = () => {
  $emit('back');
}
</script>
<script lang="ts">
export default {
  // 解决编译成微信小程序时，自定义组件会多一级父级节点
  options: { virtualHost: true }
};
</script>
<style scoped lang="scss">
.mot-nav-bar {
  width: 100%;
  display: flex;
  align-items: center;
  top: 0px;
  justify-content: center;
  position: relative;
  color: v-bind(color);
  background-color: transparent;
  z-index: v-bind(zIndex);
  padding-bottom: 8px;
  box-sizing: content-box;

  &-title {
    font-weight: bold;
  }
}

.bg-color {
  background-color: v-bind(bgColor);
}

.icon-large {
  font-size: 22px;
  position: absolute;
  left: 10rpx;
  color: v-bind(color);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>