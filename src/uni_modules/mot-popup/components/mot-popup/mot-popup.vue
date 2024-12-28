<template>
  <uni-popup ref="popup" :type="props.direction" :safe-area="false" :is-mask-click="false">
    <view :class="['mot-popup']">
      <view class="mot-popup__title mot-title" v-if="props.title">
        {{ props.title }}
      </view>
      <view class="mot-popup__content" v-if="props.content">
        {{ content }}
      </view>
      <solt v-else></solt>
      <view class="mot-popup__footer row" v-if="props.cancelStyle === 'button'">
        <mot-button :text="cancelText" size="normal" type="info" @click="cancel" ></mot-button>
        <mot-button
          :text="confirmText"
          size="normal"
          type="primary"
          @click="confirm"
        ></mot-button>
      </view>
      <view v-else class="mot-popup__footer column">
        <mot-button :text="confirmText" size="normal" type="primary" @click="confirm"></mot-button>
        <text class="mot-popup__footer__cancel-text" @click="cancel">{{ cancelText }}</text>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
const emit = defineEmits(['update:modelValue', 'close', 'open']);
import { useSetButton, useModal } from './hook';
const popup = ref();
const props = defineProps({
  /**
   * 可见
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * 方向
   */
  direction: {
    type: String,
    default: 'center'
  },
  /**
   * 是否显示遮罩层
   */
  mask: {
    type: Boolean,
    default: true
  },
  /**
   * 点击遮罩层是否关闭
   */
  maskClosable: {
    type: Boolean,
    default: true
  },
  /**
   * 可滑动
   */
  slide: {
    type: Boolean,
    default: false
  },
  /**
   * 弹出层高度
   * 只有在 direction 为 top 或 bottom 时生效
   */
  height: {
    type: Number,
    default: 330
  },
  /**
   * 弹出层宽度
   * 只有在 direction 为 left 或 right 时生效
   */
  width: {
    type: Number,
    default: 290
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  cancelStyle: {
    type: String,
    default: 'button'
  }
});
const { confirmText, cancelText } = useSetButton(props);
useModal(props, emit, popup);
const cancel = () => {
  // emit('cancel');
};
const confirm = () => {
  // emit('confirm');
};
</script>

<style lang="scss" scoped>
@import '../../../mot-theme/common/variable.scss';
.mot-popup {
  background: #fff;
  width: calc(75vw);
  font-size: 28rpx;
  border-radius: 36rpx;
  padding: 36rpx 36rpx 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: calc(75vh);
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &__content {
    color: #999;
  }
  &__title,&__content,&__footer {
    padding-bottom: 36rpx;
  }
}
.row {
  flex-direction: row;
}
.column {
  flex-direction: column;
}

</style>
