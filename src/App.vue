<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show3');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style lang="less">
@import url('./static/fonticons/index.css');
@import url('./static/fonticons/motbill.css');
@import url('./static/css/index.css');
checkbox.site-check .wx-checkbox-input {
  border-radius: 50% !important;
  color: #ffffff !important;
}

checkbox.site-check .wx-checkbox-input.wx-checkbox-input-checked {
  color: #fff;
  background: #f8b200;
  border: 1rpx solid #f8b200;
}
</style>
