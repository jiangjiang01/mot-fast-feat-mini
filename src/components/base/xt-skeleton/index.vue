<template>
  <view
    class="skeleton-wrap"
    :style="style"
    :class="{
      'button-block': block,
    }">
    <view class="light"> </view>
    <slot>
      <view class="content">
        <view class="middle"> </view>
        <view class="content-top">
          <view class="block content-top-left" :style="childStyle"> </view>
          <view class="block content-top-right" :style="childStyle"> </view>
        </view>
        <view class="middle1"> </view>
        <view class="block content-item-long" :style="childStyle"> </view>
        <view class="middle2"> </view>
        <view class="block content-item-short" :style="childStyle"> </view>
        <view class="middle3"> </view>
        <view class="block content-bottom" :style="childStyle"> </view>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  block: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
    default: '#ffffff',
  },
  width: {
    type: [String, Number],
    default: 'fit-content',
  },
  // height: {
  //   type: [String, Number],
  //   default: '276rpx',
  // },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  childBgColor: {
    type: String,
    default: '#0000000F',
  },
});
const style = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}rpx` : props.width,
    // height: typeof props.height === 'number' ? `${props.height}rpx` : props.height,
    ...(props.bgColor && { backgroundColor: props.bgColor }),
    ...(props.bgColor && {
      borderColor: props.bgColor,
    }),
    ...props.customStyle,
  };
});
const childStyle = computed(() => {
  return {
    ...(props.childBgColor && { backgroundColor: props.childBgColor }),
  };
});
</script>

<style lang="less" scoped>
.button-block {
  width: 100% !important;
}
.skeleton-wrap {
  // display: inline-block;
  fill: rgba(39, 43, 44, 0.6);
  backdrop-filter: blur(4px);
  // height: 276rpx;
  // background-color: #272b2c99;
  // background-color: #fff;
  overflow: hidden;
  position: relative;
  border-radius: 16rpx;
}
.light {
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, rgba(217, 217, 217, 0) 0%, rgba(217, 217, 217, 0.15) 49.63%, rgba(217, 217, 217, 0) 100%);
  background-size: 120rpx 100%;
  background-repeat: no-repeat;
  animation: 1s wordsLoop linear infinite normal;
}
.block {
  border-radius: 8rpx;
  // background: rgba(255, 255, 255, 0.1);
  // background: rgba(0, 0, 0, 0.06);
}

.content {
  padding: 0 30rpx;
  height: 276rpx;
  .content-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20%;
    .content-top-left {
      width: 51%;
      height: 100%;
    }
    .content-top-right {
      width: 14%;
      height: 60%;
    }
  }
  .content-item-long {
    height: 12%;
    width: 77%;
  }
  .content-item-short {
    height: 12%;
    width: 59.6%;
  }
  .content-bottom {
    height: 16%;
    width: 25.5%;
  }
}
.middle {
  height: 10%;
}
.middle1 {
  height: 8%;
}
.middle2 {
  height: 4%;
}
.middle3 {
  height: 8%;
}

@keyframes wordsLoop {
  0% {
    transform: translateX(-120rpx);
    -webkit-transform: translateX(-120rpx);
  }
  100% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }
}
</style>
