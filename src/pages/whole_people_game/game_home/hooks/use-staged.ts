import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue';

const STAGE_IMG_LOW =
  'https://table-cos.xironiot.com/cos_images/1735289001953791007_D6m7dPd.png';
const STAGE_IMG_MIDDLE =
  'https://table-cos.xironiot.com/cos_images/1735289006870695705_YhRb5CL.png';
const STAGE_IMG_HIGH =
  'https://table-cos.xironiot.com/cos_images/1735289012093859870_YnobSFr.png';
const STAGE_IMG_LOW_ACTIVE =
  'https://table-cos.xironiot.com/cos_images/1735288999924419073_o0ABcCs.png';
const STAGE_IMG_MIDDLE_ACTIVE =
  'https://table-cos.xironiot.com/cos_images/1735289004661260783_019fWoj.png';
const STAGE_IMG_HIGH_ACTIVE =
  'https://table-cos.xironiot.com/cos_images/1735289010059272586_RcKCT6P.png';

export const useStaged = () => {
  let containerTop = 0;
  let stageBoxTop = 0;
  let stageBoxHeight = 0;

  const that = getCurrentInstance();

  const isStageSticky = ref(false);
  const stageDistance = ref(0);
  const scrollTop = ref(0);
  const stageOneTop = ref(780);
  const stageTwoTop = ref(1700);
  const stageThreeTop = ref(2000);

  const stageList = computed(() => {
    if (scrollTop.value >= stageThreeTop.value) {
      return [STAGE_IMG_LOW, STAGE_IMG_MIDDLE, STAGE_IMG_HIGH_ACTIVE];
    }
    if (scrollTop.value >= stageTwoTop.value) {
      return [STAGE_IMG_LOW, STAGE_IMG_MIDDLE_ACTIVE, STAGE_IMG_HIGH];
    }
    return [STAGE_IMG_LOW_ACTIVE, STAGE_IMG_MIDDLE, STAGE_IMG_HIGH];
  });

  const setStagePos = (idx: number) => {
    if (idx === 2) {
      scrollTop.value = stageThreeTop.value;
    } else if (idx === 1) {
      scrollTop.value = stageTwoTop.value;
    } else {
      scrollTop.value = stageOneTop.value;
    }

    // fix：sticky 定位时，连续点击同一个阶段，1px的闪动
    // if (isStageSticky.value && Math.abs(stageDistance.value - scrollTop.value) <= 2) {
    //   return;
    // }

    isStageSticky.value = true;
    // fix：两次点击同一个阶段，不会触发滚动事件，相同时+1px
    const isNotMoved = stageDistance.value === scrollTop.value;
    stageDistance.value = scrollTop.value + Number(isNotMoved);
    uni.pageScrollTo({
      scrollTop: stageDistance.value,
    });
  };

  // 获取 container  的 top 值
  const getContainerTop = () => {
    uni
      .createSelectorQuery()
      .in(that)
      .select('.js-container')
      .boundingClientRect((rect: any) => {
        console.log('container', rect);
        if (rect) {
          containerTop = rect?.top ?? 0;
        }
      })
      .exec();
  };

  // 获取 stageBox 的 top 值
  const getStageBoxTop = () => {
    uni
      .createSelectorQuery()
      .in(that)
      .select('#js-stageBox')
      .boundingClientRect((rect: any) => {
        // console.log('stageBox', rect);
        if (rect) {
          stageBoxTop = rect?.top ?? 0;
          stageBoxHeight = rect?.height ?? 0;
        }
      })
      .exec();
  };

  // 获取阶段二位置、阶段三位置
  const getStageItemsPos = () => {
    uni
      .createSelectorQuery()
      .in(that)
      .selectAll('.js-stage')
      .boundingClientRect((rect: any) => {
        // console.log('js-stage', rect);
        if (rect && rect.length >= 3) {
          // 减掉的高度
          const subHeight = containerTop + stageBoxHeight + 15;
          if (rect[0]?.top) {
            stageOneTop.value = Math.ceil(rect[0]?.top - subHeight);
          }
          if (rect[1]?.top) {
            stageTwoTop.value = Math.ceil(rect[1]?.top - subHeight);
          }
          if (rect[2]?.top) {
            stageThreeTop.value = Math.ceil(rect[2]?.top - subHeight);
          }
          console.log(
            'stageOneTop',
            stageOneTop.value,
            'stageTwoTop',
            stageTwoTop.value,
            'stageThreeTop',
            stageThreeTop.value
          );
        }
      })
      .exec();
  };

  const getAllStagePos = async () => {
    await nextTick();
    getContainerTop();
    getStageBoxTop();
    getStageItemsPos();
  };

  onMounted(() => {
    getAllStagePos();
  });

  // 使用防抖函数会导致快速滚动到顶部时，状态不恢复
  const onStageWrapScroll = (e: any) => {
    // const sTop = Math.ceil(e.detail?.scrollTop ?? 0);
    const sTop = Math.ceil(e?.scrollTop ?? 0);
    scrollTop.value = sTop;
    isStageSticky.value = sTop >= stageBoxTop;
    // console.log('sss', sTop, isStageSticky.value);
  };

  return {
    stageDistance,
    stageList,
    isStageSticky,
    onStageWrapScroll,
    setStagePos,
    getAllStagePos,
  };
};
