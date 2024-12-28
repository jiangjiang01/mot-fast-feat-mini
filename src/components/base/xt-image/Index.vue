<template>
  <!-- 展示图片 -->
  <image
    :src="src"
    :mode="mode"
    :class="`${className} ${hasErrCls ? 'mot-img-error' : ''}`"
    :style="styleObj"
    @load="handleImageLoaded"
    @error="handleImageError"></image>

  <!-- 展示 loading -->
  <view v-if="!hasLoad" :class="className" :style="styleObj">
    <view class="t-relative t-w-full t-h-full">
      <view class="loading-wrapper">
        <view class="skeleton"></view>
      </view>
    </view>
  </view>

  <!-- 图片加载错误时，展示提供的默认内容 -->
  <slot v-else-if="hasLoadError"></slot>
</template>
<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  mode?: string;
  src: string;
  // 内容是否为空
  empty?: boolean;
  styleObj?: any;
  className?: any;
}

const props = withDefaults(defineProps<Props>(), {
  empty: false,
});

// const localSrc = ref('');
// onMounted(() => {
//   setTimeout(() => {
//     localSrc.value = props.src;
//   }, 3000);
// });

const hasLoad = ref(false);
const hasLoadError = ref(false);

const hasErrCls = computed(() => {
  // 未加载完成，展示loading，隐藏图片位置
  if (!hasLoad.value) {
    return true;
  }
  // 有slot内容 && 图片加载失败，展示slot内容，隐藏图片位置
  if (hasLoadError.value && !props.empty) {
    return true;
  }
  return false;
});

const handleImageLoaded = () => {
  hasLoad.value = true;
  hasLoadError.value = false;
};

const handleImageError = () => {
  hasLoad.value = true;
  hasLoadError.value = true;
};
</script>

<style scoped lang="scss">
.mot-img-error {
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}
.loading-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16rpx;
  z-index: 9;
}
.skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f6f6f6 25%, #e7e7e7 50%, #f6f6f6 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 8rpx;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
