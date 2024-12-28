<template>
  <mot-nav-bar
    :options="{ title: '积分攻略', color: '#191919', fixed: true }"
    @back="onBack"
  ></mot-nav-bar>
  <view>
    <image
      v-if="imgUrl"
      class="t-w-full"
      style=""
      mode="widthFix"
      :src="imgUrl"
    />
    <view v-else class="t-text-center t-color-555" style="padding: 400rpx 0"
      >暂无数据~</view
    >
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { onBack } from '../utils';
// import $api from '@/axios/methods';

const imgUrl = ref('https://table-cos.xironiot.com/cos_images/1735283994616747620_OkTQpa9.jpg');

onLoad(() => {
  // $api.get<{ join_we_chat_group_url: string }>('/client/private_domain/config/get_we_chat_group/').then((res) => {
  //   imgUrl.value = res?.Result?.join_we_chat_group_url ?? '';
  // });
});
</script>
