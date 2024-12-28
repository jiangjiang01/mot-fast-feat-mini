<template>
  <picker-view-column v-if="dateIncludeFormat('YYYY')">
    <view v-for="(item, index) in yearCom" :key="index" class="flex-center">
      {{ formatTxt(item, DateTypeEnum.year) }}
    </view>
  </picker-view-column>
</template>