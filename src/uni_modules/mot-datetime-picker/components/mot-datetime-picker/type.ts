import type { Ref, ShallowReactive, ComputedRef } from 'vue';
export type { Dayjs } from 'dayjs';
export type TextType = 'year' | 'month' | 'day' | 'hour' | 'minute';
export type RangeType = 'startTimeSelected' | 'endTimeSelected';
export type FormatType =
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD'
  | 'YYYY-MM'
  | 'YYYY'
  | 'MM'
  | 'HH:mm'
  | 'YYYY-MM-DD HH'
  | 'HH';

export interface StateType {
  currentTimeIndex: number[];
  timeRange: string[];
  startTimeSelected: boolean;
  endTimeSelected: boolean;
}

export interface PropsType {
  modelValue: string | string[];
  visible: boolean;
  maxDate: string;
  minDate: string;
  isRange: boolean;
  format: string;
  step: number;
}
export interface initParamsType {
  props: PropsType;
  state: ShallowReactive<StateType>;
}
export interface initParamsListType {
  yearCom: ComputedRef<number[]>;
  monthCom: ComputedRef<number[]>;
  dayCom: ComputedRef<number[]>;
  hourCom: ComputedRef<number[]>;
  minuteCom: ComputedRef<number[]>;
}
export interface ElType extends HTMLElement {
  open: () => void;
  close: () => void;
}
export interface EmitType {
  (e: 'update:visible', ev: boolean): void;
  (e: 'update:modelValue', ev: string[]|string): void;
  (e: 'confirm', ev: string[]|string): void;
}