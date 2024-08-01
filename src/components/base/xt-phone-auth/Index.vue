<template>
  <van-dialog :title="title" :message="message" :show="modelValue" confirm-button-open-type="getPhoneNumber"
    :show-cancel-button="true" :confirm-button-text="confirmButtonText" :cancel-button-text="cancelButtonText"
    @getphonenumber="onsubmit" @cancel="onCancel">
  </van-dialog>
</template>

<script setup lang="ts">
import { usePhoneAuthorization } from '@/utils/authorization';

const { getphonenumber } = usePhoneAuthorization();
withDefaults(
  defineProps<{
    modelValue: boolean;
    message?: string;
    title?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
  }>(),
  {
    modelValue: false,
    message: '为了能够正常地使用各项功能，强烈建议您授权绑定手机号。如果您未授权绑定手机号，可能会影响您正常使用',
    title: '温馨提示',
    confirmButtonText: '授权登录',
    cancelButtonText: '取消',
  }
);
const $emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm', ev: any): void;
  (e: 'update:modelValue', ev: boolean): void;
}>();

function onCancel() {
  $emit('update:modelValue', false);
  $emit('cancel');
}
async function onsubmit(e: any) {
  const isGetPhone = await getphonenumber(e);
  if (isGetPhone) {
    $emit('confirm', e);
    $emit('update:modelValue', false);
  } else {
    $emit('cancel');
  }
}
</script>

<style lang="scss" scoped></style>
