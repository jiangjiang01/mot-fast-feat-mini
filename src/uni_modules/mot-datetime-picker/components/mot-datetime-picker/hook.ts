import type { Ref } from 'vue';
import { computed, nextTick, ref, watch } from 'vue';
import {
  additionsZeroSingle,
  dateUtil,
  findDateIndex,
  formatValueToDatetime,
  formatShowValue,
  valueIsIncludeMixMax,
} from './util';
import type { StateType, PropsType, ElType, initParamsType, initParamsListType, EmitType, RangeType } from './type';
import { DateTypeEnum, MIN_DEFAULT, MAX_HOUR, MAX_MINUTE, MIN_MINUTE, MAX_YEAR } from './const';

export const useInitHook = (
  { props, state }: initParamsType,
  popup: Ref<ElType>,
  { yearCom, monthCom, dayCom, hourCom, minuteCom }: initParamsListType
) => {
  /**
   * @description 判断格式是否包含
   * @param dateFormat
   */
  const dateIncludeFormat = (dateFormat: string) => {
    return props.format.includes(dateFormat);
  };
  /**
   * @description 设置值
   * @param time
   */
  const setValue = (time: string) => {
    const { year, month, day, hour, minute } = getDateItemValue(time);
    const yearIndex = findDateIndex(yearCom.value, year);
    nextTick(() => {
      const monthIndex = findDateIndex(monthCom.value, month);
      const dayIndex = findDateIndex(dayCom.value, day);
      const hourIndex = findDateIndex(hourCom.value, hour);
      const minuteIndex = findDateIndex(minuteCom.value, minute);
      state.currentTimeIndex = [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex];
    });
  };
  /**
   * @description: 监听弹框显示/隐藏 ，默认值的变化
   * @return {*}
   */
  watch(
    [() => props.modelValue, () => props.visible],
    async ([value, visable]) => {
      //展示弹框
      !popup.value && (await nextTick());
      if (visable) {
        popup.value && popup.value.open();
      } else {
        popup.value && popup.value.close();
        return;
      }
      // 不管传过来是什么 自动全部按照 YYYY-MM-DD HH:mm 的格式去比较大小和渲染值
      let currentValue: any = '';
      const { format } = props;
      if (typeof value === 'string') {
        state.timeRange = [value];
      } else {
        state.timeRange = Object.assign([], value);
      }
      currentValue = formatValueToDatetime(format, state.timeRange[0] || new Date());
      const minDate = formatValueToDatetime(format, props.minDate);
      const maxDate = formatValueToDatetime(format, props.maxDate);
      currentValue = valueIsIncludeMixMax(minDate, maxDate, currentValue);
      setValue(currentValue);
    },
    {
      immediate: true
    }
  );
  return {
    isRangeCom: computed(() => props.isRange),
    dateIncludeFormat,
    setValue
  };
};
export const useOperationHook = (
  { state, props }: initParamsType,
  emit: EmitType,
  { yearCom, monthCom, dayCom, hourCom, minuteCom }: initParamsListType
) => {
  //
  const onChangeDate = async (e: { detail: { value: number[] } }) => {
    const value = e.detail.value.map((item) => {
      if (item === -1) {
        return 0;
      }
      return item;
    });
    state.currentTimeIndex = value;
  };
  watch(
    () => state.currentTimeIndex,
    (val) => {
      const date = getDate();
      const formatValue = formatShowValue(props.format, date);
      if (props.isRange && state.endTimeSelected) {
        state.timeRange[1] = formatValue;
        return;
      }
      state.timeRange[0] = formatValue;
    },
    {
      deep: true
    }
  );
  const getDate = () => {
    const [yearIndex = 0, monthIndex = 0, dayIndex = 0, hourIndex = 0, minuteIndex = 0] = state.currentTimeIndex;
    const dealListParams = [
      { index: yearIndex, list: yearCom.value, type: DateTypeEnum.year },
      { index: monthIndex, list: monthCom.value, type: DateTypeEnum.month },
      { index: dayIndex, list: dayCom.value, type: DateTypeEnum.day },
      { index: hourIndex, list: hourCom.value, type: DateTypeEnum.hour },
      { index: minuteIndex, list: minuteCom.value, type: DateTypeEnum.minute }
    ];
    const { year, month, day, hour, minute } = onDateChangeItem(dealListParams);
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
  const onDateChangeItem = (dealList: { index: number; list: number[]; type: DateTypeEnum }[]) => {
    const dealObject = {} as unknown as any;
    for (let i = 0; i < dealList.length; i++) {
      const { index, list, type } = dealList[i];
      dealObject[type] = additionsZeroSingle(list[index]);
    }
    return dealObject;
  };
  const onClosePopup = () => {
    emit('update:visible', false);
    state.timeRange = [];
    state.startTimeSelected = true;
    state.endTimeSelected = false;
    state.currentTimeIndex = [0, 0, 0, 0, 0];
  };
  /**
   * 确认时间
   */

  const onConfirmDateTime = () => {
    const start = formatValueToDatetime(props.format,state.timeRange[0]);
    const end = formatValueToDatetime(props.format,state.timeRange[1]);
    const { isRange } = props;
    if (start > end && isRange) {
      uni.showToast({icon:'none', title: '开始时间不能大于结束时间' });
      return;
    }
    if (!state.timeRange[1] && isRange) {
      uni.showToast({ icon:'none',title: '请选择结束时间' });
      return;
    }
    emit('update:modelValue', state.timeRange);
    emit('confirm', state.timeRange);
    onClosePopup();
  };
  /**
   * @description 时间段
   * @param selected
   * @param unselected
   */
  const selectRange = (selected: RangeType, unselected: RangeType): Promise<Dayjs> => {
    return new Promise((resolve) => {
      state[selected] = true;
      state[unselected] = false;
      const date = getDate();
      const showTime = formatShowValue(props.format, date);
      // 时间段开始时间
      if (state.startTimeSelected) {
        // 如果时间已选，时间选择条跳到已选时间位置
        state.timeRange[0] = state.timeRange[0] || showTime;
      } else if (state.endTimeSelected) {
        state.timeRange[1] = state.timeRange[1] || showTime;
      }
      const currentTime = dateUtil(state.endTimeSelected ? state.timeRange[1] : state.timeRange[0])
      resolve(currentTime);
    });
  };
  return {
    selectRange,
    onClosePopup,
    onConfirmDateTime,
    onChangeDate
  };
};
export const useDateFormatHook = (props: PropsType, state: StateType) => {
  //最小日期
  const minDateCom = computed(() => formatValueToDatetime(props.format, props.minDate));
  //最大日期
  const maxDateCom = computed(() => formatValueToDatetime(props.format, props.maxDate));
  //当前日期对应的下标
  const indexs = state.currentTimeIndex.map((_, index) => index);
  const [yearIndex = 0, monthIndex = 1, dayIndex = 2, hourIndex = 3, minuteIndex = 4] = indexs;
  //判断是否选择的是当前最小年
  const isMinYear = computed(() => !state.currentTimeIndex[yearIndex]);
  //判断是否选择的是当前最大年
  const ismaxYear = computed(() => state.currentTimeIndex[yearIndex] === yearCom.value?.length - 1);
  //判断是否选择的是当前最小月
  const isMinMonth = computed(() => !state.currentTimeIndex[monthIndex]);
  //判断是否选择的是当前最大月
  const ismaxMonth = computed(() => state.currentTimeIndex[monthIndex] === monthCom.value?.length - 1);
  //判断是否选择的是当前最小日
  const isMinDay = computed(() => !state.currentTimeIndex[dayIndex]);
  //判断是否选择的是当前最大日
  const ismaxDay = computed(() => state.currentTimeIndex[dayIndex] === dayCom.value?.length - 1);
  //判断是否选择的是当前最小小时
  const isMinHour = computed(() => !state.currentTimeIndex[hourIndex]);
  //判断是否选择的是当前最大分钟
  const isMaxHour = computed(() => state.currentTimeIndex[hourIndex] === hourCom.value?.length - 1);
  //设置每列数据范围
  const setData = (min: number, max: number) => {
    const data = [];
    for (let i = min; i <= max; i++) {
      data.push(i);
    }
    return data;
  };
  // 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
  const isHasValue = (list: number[], index: number) => {
    const { currentTimeIndex } = state;
    if (!list[currentTimeIndex[index]] && list.length) {
      currentTimeIndex[index] = list[0];
    }
  };
  // 时间数组---年
  const yearCom = computed(() => {
    const { year: minYear } = getDateItemValue(minDateCom.value);
    const { year: maxYear } = getDateItemValue(maxDateCom.value);
    const years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }
    return years;
  });
  // 时间数组---月
  const monthCom = computed(() => {
    let max = MAX_YEAR,
      min = MIN_DEFAULT;
    const { month: minMonth } = getDateItemValue(minDateCom.value);
    const { month: maxMonth } = getDateItemValue(maxDateCom.value);
    if (isMinYear.value) {
      min = minMonth;
    }
    if (ismaxYear.value) {
      max = maxMonth;
    }
    const months = setData(min, max);
    isHasValue(months, monthIndex);
    return months;
  });
  // 时间数组---天
  const dayCom = computed(() => {
    let min = MIN_DEFAULT;
    let currentYear = yearCom.value[state.currentTimeIndex[yearIndex]] || 0;
    let currentMonth = monthCom.value[state.currentTimeIndex[monthIndex]] || 0;
    let current = `${currentYear}-${currentMonth}-1`;
    const { day: minDay } = getDateItemValue(minDateCom.value);
    const { day: maxDay } = getDateItemValue(maxDateCom.value);
    // 获取当前年月份包含的天数
    let max = dateUtil(current).daysInMonth();
    if (isMinYear.value && isMinMonth.value) {
      min = minDay;
    }
    if (ismaxMonth.value && ismaxYear.value) {
      max = maxDay;
    }
    const days = setData(min, max);
    isHasValue(days, dayIndex);
    return days;
  });

  // 时间数组 --小时
  const hourCom = computed(() => {
    let max = MAX_HOUR;
    let min = MIN_DEFAULT;
    const { hour: minHour } = getDateItemValue(minDateCom.value);
    const { hour: maxHour } = getDateItemValue(maxDateCom.value);
    if (isMinYear.value && isMinMonth.value && isMinDay.value) {
      min = minHour;
    }
    if (ismaxMonth.value && ismaxYear.value && ismaxDay.value) {
      max = maxHour;
    }
    const hours = setData(min, max);
    isHasValue(hours, hourIndex);
    return hours;
  });
  // 时间数组 -- 分钟
  // 可添加时间间隔的分钟，可设置步长
  const minuteCom = computed(() => {
    const minuteStep = props.step;
    const minutes: number[] = [];
    let min = MIN_MINUTE;
    let max = MAX_MINUTE;
    let stepTemp = 0;
    if (minuteStep < 0 || minuteStep > MAX_MINUTE) {
      uni.showToast({ title: '步长值错误' });
      return [];
    }

    const { minute: minMonute } = getDateItemValue(minDateCom.value);
    const { minute: maxMonute } = getDateItemValue(maxDateCom.value);
    if (isMinYear.value && isMinMonth.value && isMinDay.value && isMinHour.value) {
      min = minMonute;
    }
    if (ismaxMonth.value && ismaxYear.value && ismaxDay.value && isMaxHour.value) {
      max = maxMonute;
    }
    for (let i = min; i <= max; i++) {
      if (stepTemp <= max) {
        minutes.push(stepTemp);
        stepTemp += props.step;
      } else {
        break;
      }
    }
    isHasValue(minutes, minuteIndex);
    return minutes;
  });
  return {
    yearCom,
    monthCom,
    dayCom,
    hourCom,
    minuteCom
  };
};
const getDateItemValue = (date: any) => {
  const currentDate = date;
  const year = currentDate.get('year');
  const month = currentDate.get('month') + 1;
  const day = currentDate.get('date');
  const hour = currentDate.get('hour');
  const minute = currentDate.get('minute');
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute
  };
};

export const useDateRangeHook = (state: StateType) => {
  const startTimeShow = computed(() => {
    return state.timeRange[0] || '';
  });

  const endTimeShow = computed(() => {
    return state.timeRange[1] || '';
  });

  return {
    startTimeShow,
    endTimeShow
  };
};
