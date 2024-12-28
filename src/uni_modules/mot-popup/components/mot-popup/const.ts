export enum DateTypeEnum {
  year = 'year',
  month = 'month',
  day = 'day',
  hour = 'hour',
  minute = 'minute',
  second = 'second'
}
export const DateTextType = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分'
};
//YYYY-MM-DD HH:mm
// 默认日期 

export const DateFormatType = {
  'YYYY': 'y',
  'YYYY-MM':'y-m',
  'YYYY-MM-DD': 'y-m-d',
  'YYYY-MM-DD HH': 'y-m-d-h',
  'YYYY-MM-DD HH:mm': 'y-m-d-h-s',
  'HH': 'h',
  'HH:mm': 'h-s',
}
export const MAX_HOUR = 23;
export const MIN_DEFAULT = 1;
export const MAX_MINUTE = 59;
export const MIN_MINUTE = 0;
export const MAX_YEAR = 12;