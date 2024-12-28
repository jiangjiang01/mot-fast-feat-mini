<template>
  <mot-nav-bar
    :options="{ title: '积分明细', color: '#191919', fixed: true }"
    @back="onBack"
  ></mot-nav-bar>
  <view class="t-bg-white t-color-black t-relative">
    <!-- header -->
    <view class="detail-header t-flex t-items-center t-justify-between">
      <view class="t-flex-1">
        <view class="t-font-bold t-text-56">888</view>
        <view class="t-text-28">我的积分</view>
      </view>
      <button
        class="mot-btn-main"
        style="width: 190rpx; height: 76rpx; background: #fff"
      >
        <xt-image
          styleObj="width: 126rpx;height:32rpx;"
          src="https://table-cos.xironiot.com/cos_images/1735355965048090289_TXuNXql.png"
        >
          <text class="t-font-black t-text-32" style="color: #030303">
            积分攻略
          </text>
        </xt-image>
      </button>
    </view>

    <view class="t-pl-30">
      <!-- 积分规则 -->
      <view>
        <view class="t-text-40 t-font-black t-mt-26">积分规则</view>
        <view class="t-mt-8 t-pb-20 t-text-24 detail-orange"
          >同1笔订单，消费积分和打球时长积分可叠加获得</view
        >
        <view class="t-flex t-items-center t-justify-between t-pr-30 t-text-center">
          <view class="detail-rule_box t-flex-center t-flex-col">
            <view class="t-text-36 t-font-black">比赛积分</view>
            <view class="t-text-20 t-mt-10">
              每开台1小时
              <view>
                即可获得
                <text class="t-font-semibold detail-orange">10积分</text>
              </view>
            </view>
          </view>
          <view class="detail-rule_box t-flex-center t-flex-col">
            <view class="t-text-36 t-font-black">消费积分</view>
            <view class="t-text-20 t-mt-10">
              每开台1小时
              <view>
                即可获得
                <text class="t-font-semibold detail-orange">10积分</text>
              </view>
            </view>
          </view>
          <view class="detail-rule_box t-flex-center t-flex-col">
            <view class="t-text-36 t-font-black">比赛积分</view>
            <view class="t-text-20 t-mt-10">
              每消费1元，即可
              <view>
                获得
                <text class="t-font-semibold detail-orange">1积分</text>
              </view>
            </view>
          </view>
        </view>
        <view class="t-flex t-items-center t-pr-30 t-text-center">
          <view class="detail-rule_box t-flex-center t-flex-col">
            <view class="t-text-36 t-font-black">报名积分</view>
            <view class="t-text-20 t-mt-10">
              报名比赛即可获
              <view>
                得
                <text class="t-font-semibold detail-orange">500-700积分</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <view class="t-text-40 t-font-black t-mt-26 t-pb-10 t-pt-30">积分明细</view>
        <view>
          <view
            v-for="item in 5"
            :key="item"
            class="t-flex t-items-center t-justify-between t-color-333 t-text-24 detail-item"
          >
            <view class="t-flex-1">
              <view class="t-text-28 t-font-medium">开台时长积分</view>
              <view class="t-color-666 t-mt-6">2023年10月10日 10:10:02</view>
            </view>
            <view> +60 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onBack } from '../utils';
</script>

<style lang="less" scoped>
.detail-header {
  padding: 206rpx 36rpx 46rpx;
  background: linear-gradient(360deg, #ffe500 0%, #fff7ad 100%);
}

.detail-orange {
  color: #ff6b00;
}

.detail-rule_box {
  width: 208rpx;
  height: 208rpx;
  margin-top: 34rpx;
  background-image: url(https://table-cos.xironiot.com/cos_images/1735356843310644889_FSqoHQJ.png);
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.detail-item {
  padding: 24rpx 30rpx 24rpx 0;
  border-bottom: 1rpx solid #dedede;
}
</style>
