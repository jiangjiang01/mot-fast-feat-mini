<template>
  <view :class="cls" ref="sticky" >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, onMounted } from 'vue';

/**
 * function 吸顶组件
 * 吸顶的父元素不能是scroll-view 或者 overflow:hidden 或 auto
 * 暂不处理 css 不兼容的情况
 * stickyShow 使用的时候需要和根目录同级  --- fix me 以后兼容
 * props offsetTop    吸顶时与顶部的距离
 * props unit         吸顶时与顶部的距离的单位
 * props zIndex       层级
 * props stickyShow   到达顶部的时候才显示，其他时候隐藏
 * props disabled     是否禁用吸顶
 * props id           当前组件id stickyShow 必传
 */

const props = defineProps({
  offsetTop: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: 'px'
  },
  zIndex: {
    type: Number,
    default: 1000
  },
  stickyShow: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  containerId: {
    type: String,
    default: 'sticky'
  }
});

const prefixCls = 'mot-sticky';

const cls = ref([prefixCls, 'hidden']);

const $emit = defineEmits<{
  (e: 'changeShow', ev: boolean): void;
}>();
const offsetTopValue = computed(() => props.offsetTop + props.unit);

onMounted(() => {
  if (props.disabled) {
    return;
  }
  const stickyShow = computed(() => props.stickyShow);
  if (stickyShow.value) {
    observeContent();
  } else {
    cls.value = dealShowCss(['show']);
  }
});
const observeContent = async () => {
  // 第一次的时候默认隐藏  initialRatio 存在不兼容的情况
  let firstLoad = true;

  const instance = getCurrentInstance()?.parent;
  if (!instance) {
    return;
  }
  const contentObserver = uni.createIntersectionObserver(instance, {
    // 检测的区间范围
    thresholds: [0.95, 0.98, 1]
  });
  // 指定页面显示区域作为参照区域之一
  contentObserver.relativeToViewport({
    top: -props.offsetTop
  });

  contentObserver.observe(`#${props.containerId}`, (res) => {
    const { top} = res.boundingClientRect;
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    console.log('top', top, props.offsetTop);
    if (top > props.offsetTop || top === props.offsetTop) {
      cls.value = dealShowCss(['hidden', 'opactiy-transition']);
      $emit('changeShow', false);
    } else {
     
      cls.value = dealShowCss(['show', 'opactiy-transition']);
      $emit('changeShow', true);

    }
  });
};

const dealShowCss = (arg: string[]) => {
  return [prefixCls, ...arg];
};
</script>
<script lang="ts">
export default {
  // 解决编译成微信小程序时，自定义组件会多一级父级节点
  options: { virtualHost: true }
};
</script>
<style lang="scss" scoped>
.mot-sticky {
    position: sticky;
    position: -webkit-sticky;
    z-index: v-bind(zIndex);
    top: v-bind(offsetTopValue);
    min-height: 1px;
}
.hidden {
  opacity: 0;
  height: 0;
}
.show {
  opacity: 1;
  height: auto;
}
.opactiy-transition {
  transition: opacity 0.3s linear;
}
</style>
