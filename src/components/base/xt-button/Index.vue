<template>
  <button
    class="button"
    hover-start-time="10"
    hover-stay-time="300"
    :style="style"
    :hover-class="disabled ? 'none' : 'button-hover'"
    :class="{
      'button-block': block,
      [size]: true,
      round: round,
      [`button--${type}`]: !!type,
      'button--text': text,
      'button--disabled': disabled,
    }"
    :open-type="disabled ? '' : openType"
    :data-source="dataSource"
    @getphonenumber="getphonenumber"
    @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  round: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default',
  },
  color: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: 'fit-content',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  openType: {
    type: String,
    default: '',
  },
  dataSource: {
    type: String,
    default: '', // 分享需要传入来源
  },
});
const $emit = defineEmits<{
  (e: 'click'): void;
  (e: 'getphonenumber', ev: any): void;
}>();

const style = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}rpx` : props.width,
    ...(props.color && { color: props.color }),
    ...(props.bgColor && { background: props.bgColor }),
    ...((props.borderColor || props.bgColor) && {
      borderColor: props.borderColor || props.bgColor,
    }),
    ...props.customStyle,
  };
});

function handleClick() {
  if (props.disabled) {
    return;
  }
  $emit('click');
}

function getphonenumber(ev: any) {
  if (props.disabled) {
    return;
  }
  $emit('getphonenumber', ev);
}
</script>

<style lang="scss" scoped>
.button {
  padding: 0 2em;
  box-sizing: border-box;
  border: 2rpx solid;
  border-radius: 12rpx;
  color: #333333;
  background-color: #fff;
  border-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    border: none;
  }
}
.button-block {
  width: 100% !important;
}
.default {
  line-height: 2.8;
  font-size: 28rpx;
}
.default.round {
  border-radius: 22px;
}
.mini {
  font-size: 24rpx;
  line-height: 2;
  padding: 0 1em;
}
.mini.round {
  border-radius: 15px;
}
.small {
  font-size: 28rpx;
  line-height: 36px;
}
.small.round {
  border-radius: 20px;
}
.large {
  font-size: 32rpx;
  height: 112rpx;
}
.large.round {
  border-radius: 56rpx;
}
.button--default {
  background-color: #fff;
  border-color: #979797;
}
.button--primary {
  background-color: #ffe100;
  border-color: #ffe100;
}
.button--primary {
  background-color: #ffe100;
  border-color: #ffe100;
}
.button--danger {
  color: #fff;
  background-color: #ee0a24;
  border-color: #ee0a24;
}
.button--text {
  background-color: transparent !important;
  border: 0;
  line-height: 1.2;
  padding: 0 1em;
}
.button--primary.button--text {
  color: #ffe100;
}
.button-hover {
  opacity: 0.5;
}
.button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
