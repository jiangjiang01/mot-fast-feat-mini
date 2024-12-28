import type { TextType ,Dayjs  } from './type';
import { DateTextType } from './const';
import dayjs from 'dayjs';

// 格式化日期时间
// 常量
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_TIME_FORMAT_SECOND = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_SECOND = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export function formatToDateTime(date: Date, format = DATE_TIME_FORMAT): string {
  if (!date) {
    return '';
  }
  return dayjs(date).format(format);
}

// 格式化日期
export function formatToDate(date: Date, format = DATE_FORMAT): string {
  if (!date) {
    return '';
  }
  return formatToDateTime(date, format);
}
/**
 * @description 补0
 * @param arr 需要补零的数组
 * @returns 返回补0后的数组
 */
export const additionsZero = (arr: number[]) => {
  return arr.map(function (value) {
    return additionsZeroSingle(value);
  });
};
export const additionsZeroSingle = (value:number) => {
  return value ? value.toString().padStart(2, '0') : '00'
}

// 增加文字后缀
export const formatTxt = (val: number | string, type: TextType) => {
  return `${val}${DateTextType[type]}`;
};
// 根据时间选中数组中的下标值
export const findDateIndex = (arr: number[], val: number) => {
  const index = arr.findIndex((item) => item === val);
  return index === -1 ? 0 : index;
};
const defaultDate = '2000-01-01';
export const formatValueToDatetime = (format: string, value: string | Date) => {
  switch (format) {
    case 'YYYY-MM-DD HH':
      value = value + ':00'; //加入分钟
      break;
    case 'HH:mm':
      value = defaultDate +' ' + value; // 加入日期
      break;
    case 'HH':
      value = defaultDate + ' ' + value + ':00'; // 加入日期 分钟
      break;
    case 'MM':
      value = defaultDate + ' ' + ' 00:' + value; // 加入日期 小时
      break;
    default:
      break;
  }
  // 其他格式自动转成成正确的日期格式，不需要填充
  return dayjs(new Date(value));
};
export const formatShowValue = (format: string, value: string) => {
  switch (format) {
    case 'YYYY':
      value = `${value.substring(0, 4)}`;
      break;
    case 'YYYY-MM':
      value = `${value.substring(0, 7)}`;
      break;
    case 'YYYY-MM-DD':
      value = `${value.substring(0, 10)}`;
      break;
    case 'YYYY-MM-DD HH':
      value = `${value.substring(0, 13)}`;
      break;
    case 'HH:mm':
      value = `${value.substring(11, 16)}`;
      break;
    case 'HH':
      value = `${value.substring(11, 13)}`;
      break;
    case 'MM':
      value = `${value.substring(5, 7)}`;
      break;
    default:
      break;
  }
  return value;
};
// 当前时间的默认值
export const valueIsIncludeMixMax = (min:Dayjs,max:Dayjs,value:Dayjs) => {
  if(value && value.isAfter(min) && value.isBefore(max) ) {
    return value
  }
  return min || max;

}
export const dateUtil = dayjs;
