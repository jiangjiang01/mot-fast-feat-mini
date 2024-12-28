<template>
  <button
    :class="[cls]"
    :style="props.buttonStyle"
    :hover-start-time="Number(props.hoverStartTime)"
    :hover-stay-time="Number(props.hoverStayTime)"
    :form-type="props.formType"
    :open-type="props.openType"
    :app-parameter="props.appParameter"
    :hover-stop-propagation="props.hoverStopPropagation"
    :send-message-title="props.sendMessageTitle"
    :send-message-path="props.sendMessagePath"
    :lang="props.lang"
    :session-from="props.sessionFrom"
    :send-message-img="props.sendMessageImg"
    :show-message-card="props.showMessageCard"
    @getphonenumber="getphonenumberEvent"
    @getuserinfo="getuserinfoEvent"
    @error="errorEvent"
    @opensetting="opensettingEvent"
    @launchapp="launchappEvent"
    @contact="contactEvent"
    @chooseavatar="chooseavatarEvent"
    @agreeprivacyauthorization="agreeprivacyauthorizationEvent"
    @addgroupapp="addgroupappEvent"
    @chooseaddress="chooseaddressEvent"
    @subscribe="subscribeEvent"
    @login="loginEvent"
    @im="imEvent"
    @click="clickEvent"
  >
    <view v-if="props.text">{{ props.text }}</view>
    <slot v-else></slot>
  </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { initEmit, buildProps } from './func';
const emitArray = [
  'click',
  'getphonenumber',
  'opensetting',
  'launchapp',
  'error',
  'contact',
  'chooseavatar',
  'agreeprivacyauthorization',
  'addgroupapp',
  'chooseaddress',
  'subscribe',
  'getuserinfo',
  'im',
  'login'
];
const emit = defineEmits([
  'click',
  'getphonenumber',
  'opensetting',
  'launchapp',
  'error',
  'contact',
  'chooseavatar',
  'agreeprivacyauthorization',
  'addgroupapp',
  'chooseaddress',
  'subscribe',
  'getuserinfo',
  'im',
  'login'
]);
const {
  getphonenumberEvent,
  opensettingEvent,
  launchappEvent,
  errorEvent,
  contactEvent,
  chooseavatarEvent,
  agreeprivacyauthorizationEvent,
  addgroupappEvent,
  chooseaddressEvent,
  subscribeEvent,
  getuserinfoEvent,
  imEvent,
  loginEvent
} = initEmit(emitArray, emit);
const clickEvent = (e: object | unknown) => {
  if (props.disabled) return;
  emit('click', e);
};
const props = defineProps(buildProps);
const prefixCls = 'mot-button';
const cls = computed(() => {
  const defaultCls = [
    prefixCls,
    `${prefixCls}-${props.size}`,
    {
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-${props.size}-${props.shape}`]: props.shape
    }
  ];
  return [
        ...defaultCls,
        `${prefixCls}-${props.type}`,
        {
          [`${prefixCls}-${props.size}-${props.shape}`]: props.shape,
          [`${prefixCls}-${props.type}-plain`]: props.plain
        }
      ];
});
</script>
<style lang="scss">
@import './style/variable.scss';
// 按钮 type
@mixin btn-style($type, $plain) {
  $bg: map-get($buttonsetting, btn-#{$type}-color);
  &-#{$type} {
    background: $bg;
    border: 2rpx solid $bg;
  }
  // primary 单独处理一下
  &-primary {
    color: $button-text-color;
  }
  &-info {
    color: $text-color;
  }
  // 镂空处理
  &-#{$type}-#{$plain} {
    background: $base-white;
    $padding: map-get($buttonsetting, btn-#{$type}-padding);
    color: $bg;
  }
}
// 按钮size
@mixin btn-size($type, $shape) {
  $padding: map-get($buttonsetting, btn-#{$type}-padding);
  $minWidth: map-get($buttonsetting, btn-#{$type}-min-width);
  $fontsize: map-get($buttonsetting, btn-#{$type}-size);
  &-#{$type} {
    font-size: $fontsize;
    padding: $padding;
    min-width: $minWidth;
  }
  //圆形按钮
  &-#{$type}-round {
    border-radius: 50%;
    height: map-get($buttonsetting, btn-#{$type}-round);
    width: map-get($buttonsetting, btn-#{$type}-round);
    padding: 0;
  }
  //椭圆型-size
  &-#{$type}-#{$shape} {
    $borderradius: map-get($buttonsetting, btn-#{$type}-#{$shape}-radius);
    border-radius: $borderradius;
  }
}
.mot-button {
  padding: 24rpx 12rpx;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  line-height: 1.2;
  font-size: $font-size;
  border-radius: 5rpx;
  display: flex;
  position: relative;
  box-sizing: border-box;
  font-weight: bold;
  color: $base-white;
  @each $type in $btntype {
    //type || plain
    @include btn-style(map-get($type, 'type'), 'plain');
  }
  @each $type in $btnsize {
    //size || round || circle
    @include btn-size(map-get($type, 'type'), 'circle');
  }
  &-disabled {
    opacity: 0.5;
  }
  &::after {
    border: 0;
    border-radius: 0;
    content: ' ';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
