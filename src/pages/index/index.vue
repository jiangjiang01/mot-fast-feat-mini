<template>
  <view class="t-px-30 t-py-40">
    <view class="t-text-center">
      <view class="t-font-bold t-color-333 t-text-40">标题</view>
      <view class="t-text-28 t-color-555 t-mt-20">内容</view>
    </view>

    <view class="t-mt-50 t-flex-center">
      <button class="mot-btn-main" style="width: 50%" @click="visible = true">
        显示弹窗提示
      </button>
    </view>

    <view class="t-mt-50 t-flex-center">
      <button class="mot-btn-main" style="width: 50%" @click="gotoFeatAPage">
        go feat a
      </button>
    </view>
  </view>

  <ExplainModal
    :visible="visible"
    title="sss"
    content="xxx"
    @hide="visible = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ExplainModal from '@/components/ExplainModal/index.vue';

const visible = ref(false);

const gotoFeatAPage = () => {
  uni.navigateTo({
    url: '/pages/featA/index',
  });
};
</script>
