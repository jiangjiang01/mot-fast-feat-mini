<template>
  <view class="list">
    <scroll-view
      class="scroll-view"
      style="height: 100%"
      :scroll-y="isScroll"
      :refresher-enabled="isData && refresherEnabled"
      :lower-threshold="lowerThreshold"
      :refresher-triggered="refresherRriggered"
      @refresherrestore="refresherrestore"
      @refresherpulling="refresherpulling"
      @refresherrefresh="refresherrefresh"
      @scrolltolower="scrolltolower">
      <view v-if="isData">
        <slot></slot>
      </view>
      <view v-if="moreStatus === 'no-more'" class="no-more">到底啦～</view>
      <view v-else class="no-more">加载中~</view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MoreStatus } from './type';

const props = withDefaults(
  defineProps<{
    moreStatus: MoreStatus;
    dataList: any[];
    refresherEnabled?: boolean;
    lowerThreshold?: string | number;
    isScroll?: boolean;
  }>(),
  {
    lowerThreshold: 50,
    refresherEnabled: true,
    moreStatus: MoreStatus.More,
    dataList: () => [],
    isScroll: true,
  }
);

const $emit = defineEmits<{
  (e: 'refresherpulling', ev: any): void;
  (e: 'scrolltolower', ev: any): void;
}>();

// 是否存在数据
const isData = computed(() => props.dataList?.length > 0 || props.moreStatus === 'loading');

const refresherRriggered = ref<boolean | string>(false);

function refresherrestore(e: any) {
  refresherRriggered.value = 'restore';
}
function refresherpulling(e: any) {
  if (e.detail.deltaY < 0) {
    return;
  }
  refresherRriggered.value = true;
}
function refresherrefresh(e: any) {
  $emit('refresherpulling', e);
}

function stopRefresh() {
  setTimeout(() => {
    refresherRriggered.value = false;
  }, 500);
}

function scrolltolower(e: any) {
  if (props.moreStatus === MoreStatus.NoMore || props.moreStatus === MoreStatus.Loading) {
    return;
  }
  $emit('scrolltolower', e);
}

defineExpose({
  stopRefresh,
});
</script>

<style lang="scss" scoped>
.list {
  height: 100%;
  overflow: hidden;
  .scroll-view {
    height: 100%;
    .no-more {
      line-height: 100rpx;
      font-size: 24rpx;
      color: #999;
      text-align: center;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
</style>
