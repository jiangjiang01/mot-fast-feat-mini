<template>
  <mot-nav-bar
    :options="{ fixed: true, zIndex: 5 }"
    @back="onBack"
  ></mot-nav-bar>

  <view class="js-container home-container t-flex t-flex-col">
    <view>
      <image
        class="t-w-screen"
        style="height: 732rpx"
        src="https://table-cos.xironiot.com/cos_images/1735117368583849230_QI7vnrz.png"
      ></image>

      <picker
        mode="region"
        level="city"
        header-text="城市选择"
        @change="onCityChange"
      >
        <view
          class="t-absolute t-left-0 t-z-10 home-site t-flex-center t-color-333 t-text-24"
        >
          <i class="iconfont icon-map-filling"></i>
          <text class="t-mx-6">{{ city || '请选择' }}</text>
          <i class="iconfont icon-arrow-down"></i>
        </view>
      </picker>

      <!-- 个人信息 -->
      <view class="home-info t-relative t-text-center">
        <view
          class="t-rounded-full t-inline-block t-overflow-hidden"
          style="width: 78rpx; height: 78rpx"
        >
          <image
            class="t-size-full"
            src="https://table-cos.xironiot.com/cos_images/1735117368583849230_QI7vnrz.png"
          />
        </view>
        <view class="t-text-28 t-color-333 t-font-medium t-mt-10"
          >Hi, 燕子李四</view
        >

        <view class="t-color-black t-mt-30 t-relative">
          <view class="t-font-black t-text-58">500</view>
          <view class="t-font-medium t-text-24">我的积分</view>

          <view
            class="t-absolute home-info_skillDetail t-flex-center"
            @click="onGotoIntegralDetail"
          >
            <view class="t-color-333 t-text-22 t-font-semibold">积分明细</view>
            <i class="iconfont icon-arrow-right t-text-24 t-ml-6"></i>
          </view>
        </view>

        <view class="t-text-20 t-color-666 t-mt-10"
          >深圳市赛最低积分：800分</view
        >

        <image
          @click="onGotoIntegralSkill"
          style="width: 120rpx; height: 120rpx"
          class="t-mt-40 t-inline-block"
          src="https://table-cos.xironiot.com/cos_images/1735285861210895846_MuEq3xY.png"
        />
      </view>

      <view
        class="t-flex t-items-center t-overflow-hidden t-z-10 t-sticky t-top-0 t-pl-28 t-py-30 t-w-full t-box-border"
        :class="{ 'home-stage_sticky': isStageSticky }"
        id="js-stageBox"
      >
        <image
          v-for="(item, idx) in stageList"
          :key="idx"
          :src="item"
          class="t-relative"
          :style="`width: 240rpx; height: 88rpx; left: -${idx * 12}rpx`"
          @click="setStagePos(idx)"
        />
      </view>

      <view class="t-pl-16">
        <!-- 主要赛程 -->
        <view
          style="color: #545454"
          class="t-text-28 t-text-center home-box js-stage"
        >
          <view
            class="home-box_title t-flex-center t-text-48 t-color-white t-font-black"
          >
            主要赛程
          </view>
          <!-- 报名 -->
          <view>
            <view class="t-color-black t-text-48 t-font-black">报名</view>
            <view
              class="t-color-black t-text-26 t-font-black t-mt-6 home-box_speicalMarker"
            >
              填写信息并缴费
            </view>
            <view class="t-mt-10">
              填写信息并缴费，即可获得
              <text class="t-color-black t-mx-6 t-font-semibold">500</text> 积分
            </view>
          </view>
          <image :src="ImgArrow" class="home-box_arrow" />

          <!-- 获取积分攻略 -->
          <view>
            <view class="t-color-black t-text-48 t-font-black"
              >获取积分攻略</view
            >
            <view
              class="t-color-black t-text-26 t-font-black t-mt-6 home-box_speicalMarker"
            >
              参加冲分赛 或 开台消费
            </view>
            <view class="t-mt-10">
              预选赛冠、亚、季分别可获得
              <text class="t-color-black t-mx-6 t-font-semibold"
                >300/200/100
              </text>
              积分
            </view>
            <view class="t-mt-10">
              获得
              <text class="t-color-black t-mx-6 t-font-semibold">700 </text>
              积分即可参加深圳市赛
            </view>
          </view>
          <image :src="ImgArrow" class="home-box_arrow" />

          <!-- 参加深圳市赛 -->
          <view>
            <view class="t-color-black t-text-48 t-font-black"
              >参加深圳市赛</view
            >
            <view class="t-mt-10">
              市赛可获得
              <text class="t-color-black t-mx-6 t-font-semibold"
                >300/200/100
              </text>
              积分，奖金等等等等
            </view>
            <view class="t-mt-10">
              获得
              <text class="t-color-black t-mx-6 t-font-semibold">700 </text>
              积分即可参加深圳市赛
            </view>
          </view>
          <image :src="ImgArrow" class="home-box_arrow" />

          <!-- 参加广东省赛 -->
          <view>
            <view class="t-color-black t-text-48 t-font-black"
              >参加广东省赛</view
            >
            <view class="t-mt-10">
              市赛可获得
              <text class="t-color-black t-mx-6 t-font-semibold"
                >300/200/100
              </text>
              积分，奖金等等等等
            </view>
            <view class="t-mt-10">
              获得
              <text class="t-color-black t-mx-6 t-font-semibold">700 </text>
              积分即可参加深圳市赛
            </view>
          </view>
          <image :src="ImgArrow" class="home-box_arrow" />

          <!-- 参加华南区赛 -->
          <view>
            <view class="t-color-black t-text-48 t-font-black"
              >参加华南区赛</view
            >
            <view class="t-mt-10">
              市赛可获得
              <text class="t-color-black t-mx-6 t-font-semibold"
                >300/200/100
              </text>
              积分，奖金等等等等
            </view>
            <view class="t-mt-10">
              获得
              <text class="t-color-black t-mx-6 t-font-semibold">700 </text>
              积分即可参加深圳市赛
            </view>
          </view>
          <image :src="ImgArrow" class="home-box_arrow" />

          <!-- 参加全国总决赛 -->
          <view>
            <view class="t-color-black t-text-48 t-font-black"
              >参加全国总决赛</view
            >
            <view class="t-mt-10">
              市赛可获得
              <text class="t-color-black t-mx-6 t-font-semibold"
                >300/200/100
              </text>
              积分，奖金等等等等
            </view>
            <view class="t-mt-10">
              获得
              <text class="t-color-black t-mx-6 t-font-semibold">700 </text>
              积分即可参加深圳市赛
            </view>
          </view>
        </view>

        <!-- 赛事规则 -->
        <view
          style="color: #545454"
          class="t-text-28 t-text-center home-box js-stage"
        >
          <view
            class="home-box_title t-flex-center t-text-48 t-color-white t-font-black"
          >
            赛事规则
          </view>
          <image class="t-absolute home-box_dots" :src="ImgRightFlag" />
          <view>
            {{ TestRule }}
          </view>
        </view>

        <!-- 赛事奖励 -->
        <view
          style="color: #545454"
          class="t-text-28 t-text-center home-box js-stage"
        >
          <view
            class="home-box_title t-flex-center t-text-48 t-color-white t-font-black"
          >
            赛事奖励
          </view>
          <image class="t-absolute home-box_dots" :src="ImgRightFlag" />
          <view>
            {{ TestReward }}
          </view>
        </view>
      </view>

      <view style="height: 300rpx"></view>
    </view>

    <view
      class="t-fixed t-z-20 t-w-screen t-left-0 t-bottom-0 t-flex-center t-bg-white t-box-border home-footer"
    >
      <button
        class="mot-reset-btn t-text-center"
        style="width: 184rpx"
        open-type="contact"
      >
        <i class="iconfont icon-telephone t-text-36 t-color-black"></i>
        <view class="t-color-black t-mt-6 t-text-24">联系客服</view>
      </button>
      <button
        class="mot-btn-main"
        style="height: 96rpx"
        @click="onGotoGameRegister"
      >
        <text class="t-color-333 t-text-32 t-font-black">立即报名</text>
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  onGotoIntegralSkill,
  onGotoIntegralDetail,
  onGotoGameRegister,
  onBack,
} from '../utils';
import { ImgArrow, ImgRightFlag, TestRule, TestReward } from './const';
import { useStaged } from './hooks/use-staged';
import { onPageScroll } from '@dcloudio/uni-app';

const {
  stageDistance,
  isStageSticky,
  stageList,
  onStageWrapScroll,
  setStagePos,
} = useStaged();

onPageScroll((e) => {
  onStageWrapScroll(e);
});

const city = ref('');
const loading = ref(true);

const onVideoLoad = () => {
  loading.value = false;
};

const onCityChange = (e: { detail: { value: string[]; code: string[] } }) => {
  console.log(e.detail.value, e.detail.code);
  city.value = e.detail.value[1];
};
</script>

<style lang="less" scoped>
@import './style/style.less';
</style>
