<template>
  <mot-nav-bar
    :options="{ title: '', color: '#191919', fixed: true }"
    @back="onBack"
  ></mot-nav-bar>

  <view class="register-container t-relative t-color-black">
    <view
      class="t-absolute t-w-full t-left-0 t-top-0 register-container_bg"
    ></view>
    <view class="t-relative" style="z-index: 2">
      <image
        class="t-absolute t-top-0 t-right-0"
        style="width: 310rpx; height: 290rpx"
        src="https://table-cos.xironiot.com/cos_images/1735354842251567277_lSLsJqS.png"
      />
      <view class="t-text-center t-color-black" style="padding-top: 230rpx">
        <view class="t-text-56 t-font-black">比赛报名</view>
        <view class="t-text-24">
          <view>使用虚假信息参赛将被取消参赛资格以及奖金，</view>
          <view>请务必填写真实信息</view>
        </view>
      </view>

      <view class="t-px-28" style="padding-bottom: 400rpx">
        <!-- 表单信息-start -->
        <view
          class="t-mt-30 t-rounded-16 t-bg-white t-px-30 t-text-28 t-pt-10 t-pb-50"
        >
          <view class="t-mt-24">
            <view class="t-font-bold">身份证号</view>
            <view class="t-mt-20 register-input_box">
              <input
                class="t-size-full"
                placeholder="请输入身份证号"
                type="idcard"
                :maxlength="18"
              />
            </view>
          </view>
          <view class="t-mt-24">
            <view class="t-font-bold">选手姓名</view>
            <view class="t-mt-20 register-input_box t-flex-center">
              <input
                class="t-h-full t-flex-1"
                placeholder="请输入真实姓名"
                :maxlength="11"
              />
              <view class="t-text-24 t-font-semibold register-blue"
                >点击实名认证</view
              >
            </view>
          </view>
          <view class="t-mt-24">
            <view class="t-font-bold">手机号</view>
            <view class="t-mt-20 register-input_box">
              <input
                class="t-size-full"
                placeholder="请输入手机号"
                type="number"
                :maxlength="11"
              />
            </view>
          </view>
          <view class="t-mt-24">
            <view class="t-font-bold">参赛城市</view>
            <picker mode="region" header-text="城市选择" @change="onCityChange">
              <view class="t-mt-20 register-input_box t-flex-center">
                <input
                  class="t-h-full t-flex-1"
                  disabled
                  v-model="city"
                  placeholder="请选择参赛城市"
                />
                <i class="iconfont icon-arrow-right t-color-666"></i>
              </view>
            </picker>
          </view>
        </view>
        <!-- 表单信息-end -->

        <!-- 户口本-start -->
        <view
          class="t-mt-30 t-rounded-16 t-bg-white t-text-22 t-color-666"
          style="padding: 36rpx 30rpx"
        >
          <view class="t-text-28 t-color-black t-font-bold">上传户口本</view>
          <view class="t-mt-10"
            >参赛者低于14周岁，需要上传户口本照片，仅作报名比赛用途。</view
          >
          <view class="t-flex t-justify-between t-mt-20 t-text-center">
            <view class="register-photo_box">
              <view class="register-photo_item">
                <view
                  class="t-size-full t-flex-center"
                  @click="onSelectImg('本人页')"
                >
                  <i class="iconfont icon-add-bold t-text-60 t-color-999"></i>
                </view>
                <view
                  class="t-absolute t-top-0 t-right-0 register-photo_item_closeBox"
                >
                  <view
                    class="t-absolute t-top-0 t-right-0 t-flex-center register-photo_item_close"
                  >
                    <i class="iconfont icon-close t-text-20 t-color-white"></i>
                  </view>
                </view>
                <image
                  @click="
                    onPreviewImage(
                      'https://table-cos.xironiot.com/cos_images/1735117368583849230_QI7vnrz.png'
                    )
                  "
                  class="t-size-full t-absolute t-left-0 t-top-0 t-z-10"
                  src="https://table-cos.xironiot.com/cos_images/1735117368583849230_QI7vnrz.png"
                />
              </view>
              <view class="t-mt-20">户口本-本人页</view>
            </view>
            <view class="register-photo_box">
              <view class="register-photo_item">
                <view
                  class="t-size-full t-flex-center"
                  @click="onSelectImg('监护人')"
                >
                  <i class="iconfont icon-add-bold t-text-60 t-color-999"></i>
                </view>
              </view>
              <view class="t-mt-20">户口本-父母或监护人页</view>
            </view>
            <view class="register-photo_box">
              <view class="register-photo_item">
                <view
                  class="t-size-full t-flex-center"
                  @click="onSelectImg('书面认可')"
                >
                  <i class="iconfont icon-add-bold t-text-60 t-color-999"></i>
                </view>
              </view>
              <view class="t-mt-20">父母或监护人书面认可</view>
            </view>
          </view>
        </view>
        <!-- 户口本-end -->
      </view>

      <!-- 报名-start -->
      <view
        class="t-fixed t-z-20 t-w-screen t-left-0 t-bottom-0 t-bg-white t-box-border register-footer"
      >
        <view class="t-color-666 t-text-24 t-text-center">
          报名成功后即可获得
          <text class="register-footer_orange">500积分</text>，若<text
            class="register-blue t-font-bold t-mx-4"
            >符合条件</text
          >可额外增加<text class="register-footer_orange">200积分</text>
        </view>
        <view class="t-px-40">
          <button
            class="mot-btn-main t-mt-30"
            style="height: 96rpx"
            @click="onSubmit"
          >
            <text class="t-color-333 t-text-28 t-font-normal t-mr-10"
              >¥29.9</text
            >
            <text class="t-color-333 t-text-32 t-font-black">立即报名</text>
          </button>
        </view>
      </view>
      <!-- 报名-end -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { onBack } from '../utils';
import { ref } from 'vue';

const city = ref('');

const onSubmit = () => {
  console.log('submit');
};

const onCityChange = (e: { detail: { value: string[]; code: string[] } }) => {
  console.log(e.detail.value, e.detail.code);
  city.value = e.detail.value.join(' ');
};

// 上传
const onSelectImg = (name: string) => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: async (res) => {
      const params = {
        msg: `${name}Image:ok`,
        name,
        tempFilePath: res.tempFilePaths[0],
        tempFile: (res.tempFiles as any)[0],
        url: '',
      };

      console.log(params);

      // const fileRes = await updateFile(params.tempFilePath);
      // console.log('上传', fileRes);

      // if (fileRes.resultType === 'success') {
      //   params.url = fileRes.data;
      //   $emit('selectChange', params);
      // } else {
      //   showToast(fileRes.msg);
      // }
    },
  });
};

const onPreviewImage = (src: string) => {
  uni.previewImage({
    current: 1,
    urls: [src],
  });
};
</script>

<style lang="less" scoped>
.register-container {
  background: #fffdf1;
}
.register-container_bg {
  height: 1404rpx;
  background: linear-gradient(180deg, #ffe500 0%, #fffdf1 100%);
  z-index: 1;
}

.register-input_box {
  height: 68rpx;
  padding: 0 24rpx;
  background: #f4f4f4;
}

.register-blue {
  color: #00649c;
}

.register-photo_box {
  width: 188rpx;
}

.register-photo_item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 188rpx;
  background: #ffffff;
  border-radius: 8rpx;
  border: 1rpx dashed #dadada;

  &_closeBox {
    width: 66rpx;
    height: 66rpx;
    z-index: 11;
  }
  &_close {
    width: 32rpx;
    height: 32rpx;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8rpx;
  }
}

.register-footer {
  border-top: 1rpx solid #b9b9b9;
  padding: 30rpx 0 60rpx;

  &_orange {
    color: #ff6b00;
  }
}
</style>
