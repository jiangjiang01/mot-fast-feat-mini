import { ref, onBeforeMount, reactive } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
export const useStyleHook = (fixed: boolean, bgColorDynac: boolean) => {
  const prefixCls = 'mot-nav-bar';
  const defaultStyle = {
    paddingTop: 0 + 'px',
    height: 32 + 'px',
    position: 'relative',
  };
  const style = ref(defaultStyle);
  const classs = ref([prefixCls]);
  const currentHeight = ref(0);
  //记录bar的高度，增加返回按钮的热区
  const iconBackStyle = reactive({
    height: 32 + 'px',
    width: 32 +'px'
  })
  onBeforeMount(() => {
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    currentHeight.value = top + height;
    iconBackStyle.height = height +'px';
    style.value = {
      paddingTop: `${top || 0}px`,
      height: `${height || 0}px`,
      position: fixed ? 'fixed' : 'relative',
    };
  });
  // 动态设置背景色 初始化的时候是透明 --然后是传过来的bgColor
  bgColorDynac &&
    onPageScroll((e) => {
      if (e.scrollTop > currentHeight.value) {
        classs.value = [prefixCls, 'bg-color'];
      } else {
        classs.value = [prefixCls];
      }
    });
  return {
    style,
    classs,
    iconBackStyle
  };
};
