<template>
  <view
    v-if="visible"
    class="t-fixed t-z-50 t-w-screen t-h-screen t-left-0 t-top-0"
    :catchtouchmove="() => {}"
    @touchmove.prevent="() => {}">
    <view class="t-bg-black t-opacity-80 t-absolute t-left-0 t-top-0 t-size-full t-z-10"></view>
    <view class="t-relative t-z-20 t-size-full t-flex-center">
      <view class="t-text-center t-box-border t-relative t-bg-white t-leading-normal t-p-40" :style="boxStyle">
        <view class="t-text-40 t-font-simibold t-color-333">{{ title }}</view>

        <view class="t-mt-20 t-text-26 t-color-333 t-text-left">
          <view v-if="content">{{ content }}</view>
          <slot v-else></slot>
        </view>

        <view class="t-px-40 t-mt-40">
          <button class="mot-btn-main" @click="emit('hide')">{{ btnText }}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    title: string;
    // 弹窗内容，支持普通文本，不传则取默认 slot
    content?: string;
    // 按钮名称
    btnText?: string;
    // 弹窗圆角，单位 rpx
    radius?: number;
    // 弹窗宽度，单位 rpx
    width?: number;
  }>(),
  { btnText: '我知道了', radius: 32, width: 600 }
);

const emit = defineEmits(['hide']);

const boxStyle = computed(() => ({
  borderRadius: `${props.radius}rpx`,
  width: `${props.width}rpx`,
}));
</script>
