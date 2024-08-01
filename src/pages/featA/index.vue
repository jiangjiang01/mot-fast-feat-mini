<template>
  <view
    class="t-absolute t-top-0 t-left-0 t-w-screen t-h-screen"
    v-if="loading"
  >
    <xt-skeleton />
    <xt-skeleton />
    <xt-skeleton />
  </view>
  <view class="t-px-40 t-pt-24 t-pb-40">
    <video
      class="t-w-full"
      v-show="!loading"
      src="https://vdept3.bdstatic.com/mda-njrdf1tmsbik29fj/cae_h264/1666797570270914502/mda-njrdf1tmsbik29fj.mp4?v_from_s=hkapp-haokan-hnb&auth_key=1722489014-0-0-dbc05fbb2235941e6674a23bcb1f4155&bcevod_channel=searchbox_feed&pd=1&cr=0&cd=0&pt=3&logid=0614793393&vid=11055909166722756765&klogid=0614793393&abtest=101830_1-17451_2"
      @loadedmetadata="onVideoLoad"
      @error="onVideoLoad"
    />

    <view class="t-text-26 t-color-333 t-leading-normal t-mt-40">
      <view class="t-text-30 t-font-semibold">小铁台球AI教练分两种模式：</view>
      <view>自由练习与中国台协九级考级练习，</view>
      <view class="t-mb-10">开台勾选AI教练服务后，两种模式可自由切换。</view>

      <view class="t-text-30 t-font-semibold t-mt-40">模式一：自由练习</view>
      <view>可在桌面上随意摆放台球与目标球，自动计算进球路线。</view>
      <view
        >注意：为了算法更好地识别并计算进球路线，此模式下，桌面只能放白球与目标球，其他球需放在置球区。</view
      >
      <image
        src="http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"
        class="t-w-full t-mt-40"
        style="height: 446rpx"
      />

      <view class="t-text-30 t-font-semibold t-mt-40">模式二：分级练习</view>
      <view
        >涵盖 中国台球协会 中式台球技能等级考试（2024 第3版）
        9级～1级全部训练要点，并配有击球路线投显，以及题目要求。</view
      >
      <image
        src="https://gips2.baidu.com/it/u=1651586290,17201034&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f600_800"
        class="t-w-full t-mt-40"
        style="height: 446rpx"
      />

      <view class="t-mt-40">示例题目：</view>
      <image
        src="http://gips3.baidu.com/it/u=4261102772,1669669862&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=720"
        class="t-w-full t-mt-40"
        style="height: 366rpx"
      />
    </view>
  </view>
  <!-- <view class="t-fixed t-left-0 t-bottom-0 t-w-full">
    <button class="mot-btn-normal btn">
      <text class="t-text-24 t-color-333">返回</text>
    </button>
  </view> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);

const onVideoLoad = () => {
  loading.value = false;
};
</script>
